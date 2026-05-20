export type TTestimonial = {
  id: number; // Unique ID for the testimonial
  reviewer_name: string; // Person’s name
  rating: number; // Rating out of 5
  title: string; // Section headline or intro line
  subtitle: string; // Sub text / tagline
  comment: string; // Testimonial text
};

export type TestimonialApiResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TTestimonial[];
};

export type TCategory = {
  id: number;
  name: string;
  slogan: string;
  icon: string | null;
  svg_icon: string;
  slug: string;
};

export type TCategoryResponse = {
  status: string;
  message: string;
  data: TCategory[];
};