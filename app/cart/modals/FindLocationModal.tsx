"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Info } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export interface Location {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

interface FindLocationPageProps {
  onConfirm: (location: Location) => void;
  errorMessage: string | null;
  isLoading: boolean;
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

const SERVICE_AREAS = ["Ajax", "Pickering", "Whitby", "Oshawa", "Scarborough"];

export default function FindLocationPage({
  onConfirm,
  errorMessage,
  isLoading,
}: FindLocationPageProps) {
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

  const apiKey = "AIzaSyBFHDroNvBvr33SCfRaWDjZZVJKUafEDb8";
  //  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error(
        "❌ Google Maps API Key is missing! Check NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var",
      );
      return;
    }

    // console.log("✅ Google Maps API Key found, loading script...");

    if (window.google?.maps?.places) {
      // console.log("✅ Google Maps already loaded");
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

      script.onload = () => {
        // console.log("✅ Google Maps script loaded successfully");
        setGoogleReady(true);
      };

      script.onerror = (error) => {
        console.error("❌ Google Maps script failed to load:", error);
        console.error("Script src was:", script.src);
      };

      document.head.appendChild(script);
    } else {
      const existing = document.getElementById(
        "gmaps-page",
      ) as HTMLScriptElement;
      if (!existing.onload) {
        existing.addEventListener("load", () => {
          // console.log("✅ Google Maps script loaded (from cache)");
          setGoogleReady(true);
        });
      }
    }
  }, [apiKey]);

  useEffect(() => {
    if (!googleReady) return;

    if (mapRef.current && !mapInstanceRef.current) {
      const FALLBACK_CENTER = { lat: 43.863621, lng: -79.011135 };

      const initMap = (center: { lat: number; lng: number }) => {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current!, {
          center,
          zoom: 15,
          disableDefaultUI: true,
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
          ],
        });

        markerRef.current = new window.google.maps.Marker({
          position: center,
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
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initMap({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            // Permission denied or unavailable — fall back to store location
            initMap(FALLBACK_CENTER);
          },
          { timeout: 6000 },
        );
      } else {
        initMap(FALLBACK_CENTER);
      }
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
  }, [googleReady]);

  const handleConfirm = () => {
    if (selectedLocation) {
      onConfirm(selectedLocation);
    }
  };

  const handleSearchChange = async (query: string) => {
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

  return (
    <div className="flex h-[75vh] w-full flex-col gap-4">
      {/* Map Section */}
      <div className="relative h-1/2 w-full overflow-hidden rounded-md">
        <div ref={mapRef} className="absolute inset-0" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="border-secondary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}
      </div>

      {/* Panel Section */}
      <div className="flex h-1/2 w-full flex-col overflow-y-auto">
        {/* <h3 className="mb-1 text-xl font-semibold">Find a location nearby</h3> */}

        {/* Service areas */}
        <div className="mb-1">
          <p className="mb-1.5 text-xs text-gray-500">
            We deliver to:{" "}
            {SERVICE_AREAS.map((area) => (
              <span key={area} className="text-xs font-medium text-orange-600">
                {area},{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-2">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search your delivery address"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm transition-all outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            autoComplete="off"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
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
                    <Search size={14} className="mt-1 shrink-0 text-gray-400" />
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
        <div className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 shrink-0 text-gray-400" />
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-600">
              No in-store pickup available.
            </span>{" "}
          </p>
        </div>
        {/* Confirm button */}
        <div className="mt-auto pt-2">
          {errorMessage ? (
            <div className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
              <p className="text-xs font-medium text-red-600">
                ⚠️ {errorMessage}
              </p>
            </div>
          ) : selectedLocation ? (
            <div className="mb-3 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2.5">
              <p className="text-secondary truncate text-xs font-medium">
                📍 {selectedLocation.address}
              </p>
            </div>
          ) : null}
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={handleConfirm}
            disabled={!selectedLocation || isLoading}
            className="w-full"
          >
            Add Location {isLoading && <Spinner />}
          </Button>

          <p className="mt-2 text-xs text-blue-700">
            - Next business day delivery (cutoff: 3 PM)
          </p>
        </div>
      </div>
    </div>
  );
}