'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getStatusBadgeClass } from '@/lib/orderStatus';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Loader2, Package, MapPin, Phone, Clock, CreditCard } from 'lucide-react';
import { getOrderById } from '@/lib/orders';
import { getProductById } from '@/data/products';
import { OrderStatusAnimation } from './OrderStatusAnimation';

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailModal({ order, open, onOpenChange }: OrderDetailModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(order);

  // Reload order from localStorage to get latest status
  useEffect(() => {
    if (open && order) {
      setIsLoading(true);
      // Load fresh order data from localStorage
      const freshOrder = getOrderById(order.id);
      if (freshOrder) {
        setCurrentOrder(freshOrder);
      }
      // Симуляция загрузки данных
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!open) {
      setIsLoading(true);
      setCurrentOrder(order);
    }
  }, [open, order]);

  // Listen for order updates to refresh status
  useEffect(() => {
    if (!open || !order) return;

    const handleOrderUpdate = () => {
      const freshOrder = getOrderById(order.id);
      if (freshOrder) {
        setCurrentOrder(freshOrder);
      }
    };

    window.addEventListener('orderUpdated', handleOrderUpdate);

    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate);
    };
  }, [open, order]);

  if (!currentOrder || !open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <DialogTitle className="text-2xl mb-2">
                Bestellung {currentOrder.orderNumber}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Vom {currentOrder.date}
              </p>
            </div>
            <div className="flex items-center">
              <OrderStatusAnimation status={currentOrder.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium mb-2">
                Transaktion wird verarbeitet...
              </p>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Ihre Zahlung wird überprüft. Dies kann einige Minuten dauern.
              </p>
            </div>
          ) : (
            <div className="space-y-6 pr-2">
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Artikel ({currentOrder.items.length})
                </h3>
                <div className="space-y-4">
                  {currentOrder.items.map((item, index) => {
                    const product = getProductById(item.productId);
                    const productImage = product?.imagesStock && product.imagesStock.length > 0 
                      ? product.imagesStock[0] 
                      : null;
                    
                    return (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={item.title}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<span class="text-xs text-muted-foreground">Bild</span>';
                                }
                              }}
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">Bild</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Menge: {item.quantity}
                          </p>
                          <p className="text-lg font-semibold mt-2">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              {currentOrder.shippingAddress && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Lieferadresse
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1 bg-muted p-4 rounded-md">
                    <p className="font-medium">{currentOrder.shippingAddress.name}</p>
                    <p>{currentOrder.shippingAddress.street}</p>
                    <p>
                      {currentOrder.shippingAddress.postalCode} {currentOrder.shippingAddress.city}
                    </p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                {currentOrder.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Telefon</p>
                      <p className="font-medium">{currentOrder.phone}</p>
                    </div>
                  </div>
                )}
                {currentOrder.deliveryTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Lieferzeit</p>
                      <p className="font-medium">{currentOrder.deliveryTime}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (Vorläufig - wird vom Kurier bestätigt)
                      </p>
                    </div>
                  </div>
                )}
                {currentOrder.paymentMethod && (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Zahlungsmethode</p>
                      <p className="font-medium">
                        {currentOrder.paymentMethod === 'bank_transfer' && 'Banküberweisung'}
                        {currentOrder.paymentMethod === 'card' && 'Kreditkarte'}
                        {currentOrder.paymentMethod === 'paypal' && 'PayPal'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Zwischensumme</span>
                  <span>{formatPrice(currentOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Versand</span>
                  <span>{formatPrice(currentOrder.shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Gesamt</span>
                  <span>{formatPrice(currentOrder.total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

