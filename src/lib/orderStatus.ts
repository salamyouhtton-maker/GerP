import { Order, OrderStatus } from './types';
import { getOrders, saveOrders } from './orders';

/**
 * Get the next status for a given current status
 */
export function getNextStatus(currentStatus: OrderStatus): OrderStatus | null {
  const statusFlow: Record<OrderStatus, OrderStatus | null> = {
    'Bezahlt': 'Bestätigt',
    'Bestätigt': 'Wird zusammengestellt',
    'Wird zusammengestellt': 'Versandt',
    'Versandt': null, // Final status
    'Geliefert': null, // Final status
    'Storniert': null, // Final status
  };

  return statusFlow[currentStatus] || null;
}

/**
 * Get the delay in milliseconds before transitioning to the next status
 */
export function getStatusChangeDelay(status: OrderStatus): number {
  const delays: Record<OrderStatus, number> = {
    'Bezahlt': 20 * 60 * 1000, // 20 minutes
    'Bestätigt': 30 * 60 * 1000, // 30 minutes
    'Wird zusammengestellt': 28 * 60 * 60 * 1000, // 28 hours
    'Versandt': 0, // No further automatic changes
    'Geliefert': 0, // No further automatic changes
    'Storniert': 0, // No further automatic changes
  };

  return delays[status] || 0;
}

/**
 * Update order statuses based on elapsed time
 * This function checks all orders and updates their status if enough time has passed
 */
export function updateOrderStatuses(): void {
  if (typeof window === 'undefined') return;
  
  const now = Date.now();
  const orders = getOrders(); // Get from localStorage
  let hasChanges = false;

  orders.forEach((order) => {
    const nextStatus = getNextStatus(order.status);
    
    if (!nextStatus) {
      // Order is in final status, no need to update
      return;
    }

    const delay = getStatusChangeDelay(order.status);
    const timeSinceStatusChange = now - order.statusChangedAt;

    if (timeSinceStatusChange >= delay) {
      // Update status
      order.status = nextStatus;
      order.statusChangedAt = now;
      hasChanges = true;
      
      console.log(`Order ${order.orderNumber} status updated: ${order.status}`);
    }
  });

  // Save changes if any
  if (hasChanges) {
    saveOrders(orders);
  }
}

/**
 * Get status badge color class based on status
 */
export function getStatusBadgeClass(status: OrderStatus): string {
  const statusClasses: Record<OrderStatus, string> = {
    'Bezahlt': 'bg-green-100 text-green-800 border-green-300',
    'Bestätigt': 'bg-blue-100 text-blue-800 border-blue-300',
    'Wird zusammengestellt': 'bg-orange-100 text-orange-800 border-orange-300',
    'Versandt': 'bg-purple-100 text-purple-800 border-purple-300',
    'Geliefert': 'bg-gray-100 text-gray-800 border-gray-300',
    'Storniert': 'bg-red-100 text-red-800 border-red-300',
  };

  return statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-300';
}

