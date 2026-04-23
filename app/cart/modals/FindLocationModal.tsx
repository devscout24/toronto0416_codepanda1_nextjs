"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export interface Location {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

interface FindLocationPageProps {
  onConfirm: (location: Location, orderType: "delivery" | "pickup") => void;
  defaultOrderType?: "delivery" | "pickup";
}

interface AutocompletePrediction {
  place_id: string;
  description: string;
  main_text?: string;
  secondary_text?: string;
  matched_substrings?: Array<{
    length: number;
    offset: number;
  }>;
}

interface GeocodeResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLDivElement, options: any) => any;
        Marker: new (options: any) => any;
        SymbolPath: any;
        Geocoder: new () => Geocoder;
        places: {
          AutocompleteService: new () => AutocompleteService;
          AutocompleteSessionToken: new () => any;
        };
      };
    };
  }
}

interface AutocompleteService {
  getPlacePredictions: (
    request: {
      input: string;
      types?: string[];
      sessionToken?: any;
    },
    callback: (predictions: AutocompletePrediction[] | null) => void,
  ) => void;
}

interface Geocoder {
  geocode: (
    request: { placeId: string },
    callback: (results: GeocodeResult[] | null) => void,
  ) => void;
}

export default function FindLocationPage({
  onConfirm,
  defaultOrderType = "delivery",
}: FindLocationPageProps) {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">(
    defaultOrderType,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const autocompleteServiceRef = useRef<AutocompleteService | null>(null);
  const geocoderRef = useRef<Geocoder | null>(null);
  const sessionTokenRef = useRef<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Static pickup location
  const pickupLocation: Location = {
    address: "289 Kingston Rd E, Ajax, ON L1Z 0K5, Canada",
    latitude: 43.863621371092954,
    longitude: -79.01370952381208,
  };

  useEffect(() => {
    if (!apiKey) return;

    if (window.google?.maps?.places) {
      setGoogleReady(true);
      return;
    }

    if (!document.getElementById("gmaps-page")) {
      const script = document.createElement("script");
      script.id = "gmaps-page";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      (script as any).loading = "async";
      script.onload = () => setGoogleReady(true);
      script.onerror = () => console.error("Google Maps failed to load");
      document.head.appendChild(script);
    } else {
      const existing = document.getElementById(
        "gmaps-page",
      ) as HTMLScriptElement;
      existing.addEventListener("load", () => setGoogleReady(true));
    }
  }, [apiKey]);

  useEffect(() => {
    if (!googleReady) return;

    if (mapRef.current && !mapInstanceRef.current) {
      const defaultCenter =
        orderType === "pickup"
          ? { lat: pickupLocation.latitude!, lng: pickupLocation.longitude! }
          : { lat: 42.4902, lng: -96.4136 };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: orderType === "pickup" ? 15 : 13,
        disableDefaultUI: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });

      markerRef.current = new window.google.maps.Marker({
        position: defaultCenter,
        map: mapInstanceRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#EA4335",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
      });

      setMapLoaded(true);
    }

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }

    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
  }, [googleReady, orderType]);

  // Update map when switching to pickup
  useEffect(() => {
    if (orderType === "pickup" && mapInstanceRef.current && markerRef.current) {
      const center = {
        lat: pickupLocation.latitude!,
        lng: pickupLocation.longitude!,
      };
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(15);
      markerRef.current.setPosition(center);
      setSelectedLocation(pickupLocation);
      setSearchQuery(pickupLocation.address);
    } else if (orderType === "delivery") {
      setSelectedLocation(null);
      setSearchQuery("");
    }
  }, [orderType]);

  const handleConfirm = () => {
    if (orderType === "pickup") {
      onConfirm(pickupLocation, "pickup");
    } else if (selectedLocation) {
      onConfirm(selectedLocation, "delivery");
    }
  };

  const handleSearchChange = async (query: string) => {
    if (orderType === "pickup") return;

    setSearchQuery(query);
    setSuggestions([]);
    setShowSuggestions(false);

    if (!query.trim() || !autocompleteServiceRef.current) return;

    try {
      const predictions = await new Promise<AutocompletePrediction[]>(
        (resolve) => {
          autocompleteServiceRef.current?.getPlacePredictions(
            {
              input: query,
              types: ["geocode"],
              sessionToken: sessionTokenRef.current,
            },
            (predictions: AutocompletePrediction[] | null) =>
              resolve(predictions || []),
          );
        },
      );
      setSuggestions(predictions);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleSuggestionClick = async (
    placeId: string,
    description: string,
  ) => {
    if (orderType === "pickup") return;

    setSearchQuery(description);
    setShowSuggestions(false);

    if (!geocoderRef.current) return;

    try {
      const results = await new Promise<GeocodeResult[]>((resolve) => {
        geocoderRef.current?.geocode(
          { placeId },
          (results: GeocodeResult[] | null) => resolve(results || []),
        );
      });

      if (results && results[0]?.geometry?.location) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const address = results[0].formatted_address || description;

        setSelectedLocation({ address, latitude: lat, longitude: lng });
        mapInstanceRef.current?.setCenter({ lat, lng });
        mapInstanceRef.current?.setZoom(15);
        markerRef.current?.setPosition({ lat, lng });
      }
    } catch (err) {
      console.error("Error getting place details:", err);
    }
  };

  const handleOrderTypeChange = (type: "delivery" | "pickup") => {
    setOrderType(type);
  };

  return (
    <div className="flex h-[75vh] w-full flex-col gap-4">
      {/* Map Section - 50% height */}
      <div className="relative h-1/2 w-full overflow-hidden rounded-md">
        <div ref={mapRef} className="absolute inset-0" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="border-secondary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}
      </div>

      {/* Text/Panel Section - 50% height */}
      <div className="flex h-1/2 w-full flex-col overflow-y-auto">
        {/* Order type toggle */}
        <div className="mb-4">
          <h3 className="mb-4 text-xl font-semibold">Find a location nearby</h3>
          <p className="mb-1 text-sm text-gray-500">Select order preference</p>
          <div className="flex gap-1 rounded-md border border-gray-200 bg-gray-50 p-0.5">
            <button
              onClick={() => handleOrderTypeChange("delivery")}
              className={`flex-1 cursor-pointer rounded-sm px-2 py-1.5 text-sm font-medium transition-all ${
                orderType === "delivery"
                  ? "border border-gray-200 bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => handleOrderTypeChange("pickup")}
              className={`flex-1 cursor-pointer rounded-sm px-2 py-1.5 text-sm font-medium transition-all ${
                orderType === "pickup"
                  ? "border border-gray-200 bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pick Up
            </button>
          </div>
        </div>

        {/* Search input - Disabled for pickup */}
        <div className="relative mb-5">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              orderType === "pickup"
                ? "Pickup location is fixed"
                : "Search a location"
            }
            className={`w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm transition-all outline-none ${
              orderType === "pickup"
                ? "cursor-not-allowed bg-gray-100 text-gray-500"
                : "bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            }`}
            autoComplete="off"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            disabled={orderType === "pickup"}
          />

          {/* Suggestions dropdown - Only for delivery */}
          {orderType === "delivery" &&
            showSuggestions &&
            suggestions.length > 0 && (
              <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.place_id}
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion.place_id,
                        suggestion.description,
                      )
                    }
                    className="hover:text-secondary w-full border-b border-gray-100 px-3 py-2.5 text-left text-sm text-gray-700 transition-colors last:border-b-0 hover:bg-orange-50"
                  >
                    <div className="flex items-start gap-2">
                      <Search
                        size={14}
                        className="mt-1 shrink-0 text-gray-400"
                      />
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* Confirm button */}
        <div className="mt-auto pt-4">
          {(orderType === "pickup" || selectedLocation) && (
            <div className="mb-3 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2.5">
              <p className="text-secondary truncate text-xs font-medium">
                📍{" "}
                {orderType === "pickup"
                  ? pickupLocation.address
                  : selectedLocation?.address}
              </p>
            </div>
          )}
          <button
            onClick={handleConfirm}
            disabled={orderType === "delivery" && !selectedLocation}
            className="w-full rounded-xl py-3.5 text-sm font-semibold transition-all"
            style={{
              background:
                orderType === "pickup" || selectedLocation
                  ? "linear-gradient(135deg, #f97316, #fb923c)"
                  : "#e5e7eb",
              color:
                orderType === "pickup" || selectedLocation ? "#fff" : "#9ca3af",
              cursor:
                orderType === "pickup" || selectedLocation
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
}
