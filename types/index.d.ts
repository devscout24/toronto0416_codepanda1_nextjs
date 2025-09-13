// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type Car = {
  id: string;
  carDetails: {
    name: string;
    model: string;
    edition: string;
    price: string;
    seller: {
      name: string;
      location: string;
      postDate: string;
      imageUrl: string | undefined;
    };
    rating: {
      value: number;
      reviewsCount: number;
    };
    mainImageUrl: string;
    thumbnailUrls: string[];
    quickSpecs: {
      type: string;
      transmission: string;
      miles: string;
      fuelLiter: string;
    };
    description: string;
    isNewToday: boolean;
  };
  overview: {
    bodyType: string;
    year: number;
    condition: string;
    cylinders: string;
    mileage: string;
    transmission: string;
    displacement: string;
    fuelType: string;
    driveType: string;
    doors: string;
    color: string;
    vin: string;
  };
  features: {
    interior: string[];
    exterior: string[];
    safety: string[];
    comfortAndPracticality: string[];
  };
  slug: string;
};
