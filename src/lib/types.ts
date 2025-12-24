export type ConditionGrade = 'A' | 'B' | 'C';

export type DefectSeverity = 'leicht' | 'mittel' | 'stark';

export type PackagingStatus = 'original' | 'reduziert' | 'ohne';

export type Category = 
  | 'Waschmaschinen'
  | 'Kühlschränke'
  | 'Geschirrspüler'
  | 'Staubsauger'
  | 'Kaffeevollautomaten';

export type DiscountReason = 
  | 'verpackung'
  | 'transport'
  | 'ausstellung'
  | 'retoure'
  | 'kleiner-makel';

export interface FunctionalChecklist {
  item: string;
  checked: boolean;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: Category;
  priceOriginal: number;
  priceSale: number;
  conditionGrade: ConditionGrade;
  discountReason: DiscountReason;
  defectSummaryShort: string;
  defectDetails: string;
  defectSeverity: DefectSeverity;
  functionalChecklist: FunctionalChecklist[];
  includedItems: string[];
  packagingStatus: PackagingStatus;
  imagesStock: string[];
  imagesRealDefect: string[];
  energyClass?: string;
  energyLabelUrl?: string;
  description?: string;
  specifications?: Record<string, string>;
  specialBadge?: 'super' | 'best';
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  slug: string;
}

export interface DiscountReasonInfo {
  id: DiscountReason;
  title: string;
  description: string;
  slug: string;
}

export type OrderStatus = 'Bezahlt' | 'Bestätigt' | 'Wird zusammengestellt' | 'Versandt' | 'Geliefert' | 'Storniert';

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  phone: string;
  deliveryTime: string;
  paymentMethod: 'bank_transfer' | 'card' | 'paypal';
  createdAt: number; // timestamp создания заказа
  statusChangedAt: number; // timestamp последнего изменения статуса
  shippingAddress?: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
  };
}


