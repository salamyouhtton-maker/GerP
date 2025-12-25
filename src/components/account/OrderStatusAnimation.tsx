'use client';

import { OrderStatus } from '@/lib/types';
import { Wallet, CheckCircle2, Package, Truck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClass } from '@/lib/orderStatus';

interface OrderStatusAnimationProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusAnimation({ status, className }: OrderStatusAnimationProps) {
  const getAnimationContent = () => {
    switch (status) {
      case 'Bezahlt':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <Wallet className="h-12 w-12 text-green-600 animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        );

      case 'Bestätigt':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <CheckCircle2 className="h-12 w-12 text-blue-600 animate-scale-in drop-shadow-lg" />
          </div>
        );

      case 'Wird zusammengestellt':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="animate-bounce">
              <Package className="h-12 w-12 text-orange-600 drop-shadow-lg" />
            </div>
            <div className="absolute top-2 right-2 h-3 w-3 bg-orange-600 rounded-full animate-ping"></div>
          </div>
        );

      case 'Versandt':
        return (
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            <Truck className="h-12 w-12 text-purple-600 animate-truck-move drop-shadow-lg" />
          </div>
        );

      case 'Geliefert':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <CheckCircle className="h-12 w-12 text-green-600 animate-scale-in drop-shadow-lg" />
          </div>
        );

      case 'Storniert':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <span className="text-red-600 text-4xl font-bold drop-shadow-lg">×</span>
          </div>
        );

      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Bezahlt':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300';
      case 'Bestätigt':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300';
      case 'Wird zusammengestellt':
        return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300';
      case 'Versandt':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300';
      case 'Geliefert':
        return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300';
      case 'Storniert':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-300';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300';
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl",
      "min-w-[160px]",
      getStatusColor(),
      className
    )}>
      <div className="h-20 w-20 rounded-full border-3 border-white/80 bg-white/60 shadow-inner flex items-center justify-center backdrop-blur-sm">
        {getAnimationContent()}
      </div>
      <Badge className={cn("text-sm font-semibold px-3 py-1", getStatusBadgeClass(status))}>
        {status}
      </Badge>
    </div>
  );
}
