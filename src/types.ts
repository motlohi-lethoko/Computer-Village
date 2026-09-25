export type ProductCategory = 
  | 'laptops'
  | 'desktops'
  | 'repairs'
  | 'chargers'
  | 'batteries'
  | 'peripherals'
  | 'printers'
  | 'networking';

export type ProductStatus = 'available' | 'sold' | 'low_stock';

export interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  os?: string;
  screenSize?: string;
  generation?: string;
  condition?: string;
  warranty?: string;
  connectivity?: string;
  voltage?: string;
  tipType?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  condition: 'Brand New' | 'Refurbished Grade A' | 'Certified Pre-Owned';
  status: ProductStatus;
  featured?: boolean;
  specs: ProductSpecs;
  image: string;
  videoUrl?: string;
  description: string;
  dateAdded: string;
}

export interface StoreVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  dateAdded: string;
}

export interface RepairService {
  id: string;
  name: string;
  turnaround: string;
  startingPrice: number;
  description: string;
  features: string[];
  discountText?: string;
  iconName: string;
}

export interface RepairBooking {
  id: string;
  customerName: string;
  phone: string;
  deviceType: string;
  model: string;
  issueDescription: string;
  urgency: 'Normal' | 'Urgent (Same Day)';
  status: 'Received' | 'Diagnosing' | 'Parts Ordered' | 'In Repair' | 'Ready for Pickup' | 'Completed';
  createdAt: string;
  estimatedCost?: number;
}

export interface SiteConfig {
  shopName: string;
  companyLegalName: string;
  tagline: string;
  address: string;
  landmark: string;
  room: string;
  phones: string[];
  whatsappNumbers: string[];
  email: string;
  businessHours: string;
  flyerImageUrl: string;
  flyerHeadline: string;
  flyerSubheadline: string;
  bannerNotice: string;
}
