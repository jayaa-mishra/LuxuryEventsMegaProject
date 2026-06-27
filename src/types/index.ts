export interface EventImage {
  id?: string;
  url: string;
  is_primary?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  client_name: string;
  category: string;
  date: string;
  location: string;
  testimonial?: string;
  featured?: boolean;
  event_images?: EventImage[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  event_type?: string;
  location?: string;
}

export interface PressItem {
  id: string;
  title?: string;
  headline?: string;
  publication: string;
  date?: string;
  published_date?: string;
  excerpt: string;
  url?: string;
  images: EventImage[];
}
