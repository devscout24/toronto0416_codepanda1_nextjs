export type TTestimonial = {
  id: number; // Unique ID for the testimonial
  name: string; // Person’s name
  rating: number; // Rating out of 5
  title: string; // Section headline or intro line
  subtitle: string; // Sub text / tagline
  feedback: string; // Testimonial text
};


export type TestimonialApiResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TTestimonial[];
};