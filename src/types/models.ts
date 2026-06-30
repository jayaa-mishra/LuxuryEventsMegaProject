export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  token?: string;
}

export interface Package {
  _id: string;
  name: string;
  description: string;
  base_price: number;
  features: string[];
  category: string;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: User | string;
  updatedBy?: User | string;
}

export interface Lead {
  _id: string;
  client_name: string;
  email: string;
  phone: string;
  event_date: string;
  desired_package?: Package | string;
  guest_count: number;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: User | string;
}

export interface Quotation {
  _id: string;
  quotationNumber?: string;
  lead_id: string | Lead;
  package_id?: string | Package;
  custom_additions?: string;
  total_amount: number;
  validUntil: string;
  generatedAt?: string;
  pdfUrl?: string;
  versionNumber: number;
  status: 'draft' | 'generated' | 'sent' | 'accepted' | 'rejected' | 'expired';
  customerSnapshot?: any;
  eventSnapshot?: any;
  packageSnapshot?: any;
  pricingSnapshot?: any;
  history?: any[];
  createdBy?: string | User;
  updatedBy?: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  client_id: User | string;
  package_id?: Package | string;
  quotation_id?: Quotation | string;
  event_date: string;
  venue: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  createdAt?: string;
  updatedAt?: string;
  createdBy?: User | string;
  updatedBy?: User | string;
}

export interface GalleryImage {
  _id?: string;
  url: string;
  public_id: string;
  is_primary: boolean;
}

export interface Gallery {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  location?: string;
  year?: number;
  guestCount?: number;
  services?: string[];
  images: GalleryImage[];
  testimonial?: { quote: string; author: string; role: string };
  stats?: { label: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}
