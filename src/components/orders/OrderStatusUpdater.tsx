'use client';

import { useEffect } from 'react';
import { updateOrderStatuses } from '@/lib/orderStatus';

/**
 * Component that automatically updates order statuses based on elapsed time
 * Runs on the client side and checks statuses every minute
 */
export function OrderStatusUpdater() {
  useEffect(() => {
    // Initial update
    updateOrderStatuses();

    // Set up interval to check and update statuses every minute
    const interval = setInterval(() => {
      updateOrderStatuses();
    }, 60 * 1000); // Check every minute

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // This component doesn't render anything
  return null;
}


