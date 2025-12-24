import { Order } from './types';

const ORDERS_STORAGE_KEY = 'bware_orders';

/**
 * Get all orders from localStorage
 */
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const ordersData = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersData ? JSON.parse(ordersData) : [];
  } catch (error) {
    console.error('Error reading orders from localStorage:', error);
    return [];
  }
}

/**
 * Save orders to localStorage
 */
export function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    // Dispatch event to notify components
    window.dispatchEvent(new Event('orderUpdated'));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
}

/**
 * Add a new order to localStorage
 */
export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order); // Add to beginning (newest first)
  saveOrders(orders);
}

/**
 * Update an existing order in localStorage
 */
export function updateOrder(orderId: string, updates: Partial<Order>): void {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    saveOrders(orders);
  }
}

/**
 * Get order by ID from localStorage
 */
export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find(order => order.id === id);
}

/**
 * Get order by order number from localStorage
 */
export function getOrderByOrderNumber(orderNumber: string): Order | undefined {
  const orders = getOrders();
  return orders.find(order => order.orderNumber === orderNumber);
}


