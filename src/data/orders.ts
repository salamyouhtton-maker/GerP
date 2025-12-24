import { Order, OrderItem } from '@/lib/types';
import { addAddress, convertShippingAddressToAddress } from '@/lib/addresses';
import { getOrders, addOrder, getOrderById as getOrderByIdFromStorage, getOrderByOrderNumber as getOrderByOrderNumberFromStorage } from '@/lib/orders';

// In a real app, this would be fetched from a database based on the logged-in user
// For now, we'll use localStorage to persist orders
// Load orders from localStorage on module initialization (only on client side)
let orders: Order[] = [];
if (typeof window !== 'undefined') {
  orders = getOrders();
}

// Export orders array for backward compatibility
export { orders };

// Re-export functions from orders utility
export function getOrderById(id: string): Order | undefined {
  if (typeof window !== 'undefined') {
    return getOrderByIdFromStorage(id);
  }
  return orders.find(order => order.id === id);
}

export function getOrderByOrderNumber(orderNumber: string): Order | undefined {
  if (typeof window !== 'undefined') {
    return getOrderByOrderNumberFromStorage(orderNumber);
  }
  return orders.find(order => order.orderNumber === orderNumber);
}

interface CreateOrderData {
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
  };
  phone: string;
  deliveryTime: string;
  paymentMethod: 'bank_transfer' | 'card' | 'paypal';
}

export function createOrder(orderData: CreateOrderData): Order {
  // Generate unique ID
  const id = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate order number (format: BW-YYYYMMDD-XXXXX)
  const orderDate = new Date();
  const dateStr = orderDate.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  const orderNumber = `BW-${dateStr}-${randomStr}`;

  // Format date
  const date = orderDate.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Convert items to OrderItem format
  const orderItems: OrderItem[] = orderData.items.map(item => ({
    productId: item.productId,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
  }));

  // Get timestamp for createdAt and statusChangedAt
  const now = Date.now();

  const order: Order = {
    id,
    orderNumber,
    date,
    status: 'Bezahlt',
    items: orderItems,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    total: orderData.total,
    phone: orderData.phone,
    deliveryTime: orderData.deliveryTime,
    paymentMethod: orderData.paymentMethod,
    createdAt: now,
    statusChangedAt: now,
    shippingAddress: orderData.shippingAddress,
  };

  // Add to orders array (at the beginning so newest orders appear first)
  orders.unshift(order);

  // Save to localStorage
  addOrder(order);

  // Save address if provided
  if (orderData.shippingAddress) {
    const addressData = convertShippingAddressToAddress(orderData.shippingAddress);
    addAddress(addressData);
  }

  // Dispatch event to notify components (already done in addOrder, but ensure it's dispatched)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('orderUpdated'));
  }

  return order;
}

