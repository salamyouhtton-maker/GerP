'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getOrders } from '@/lib/orders';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { OrderDetailModal } from '@/components/account/OrderDetailModal';
import { Order } from '@/lib/types';
import { getStatusBadgeClass } from '@/lib/orderStatus';
import { getProductById } from '@/data/products';
import { isLoggedIn } from '@/lib/user';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/registrieren');
      return;
    }
  }, [router]);

  // Load orders from localStorage and listen for updates
  useEffect(() => {
    const loadOrders = () => {
      setOrders(getOrders());
    };

    // Load orders on mount
    loadOrders();

    // Listen for order updates
    const handleOrderUpdate = () => {
      loadOrders();
    };

    window.addEventListener('orderUpdated', handleOrderUpdate);

    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate);
    };
  }, []);

  const handleShowDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/konto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Übersicht
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-8">Bestellungen</h1>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Sie haben noch keine Bestellungen aufgegeben.
                </p>
                <Button asChild>
                  <Link href="/katalog">Zum Katalog</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-2">Bestellung {order.orderNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground">Vom {order.date}</p>
                      </div>
                      <Badge className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {(() => {
                          const firstItem = order.items[0];
                          if (!firstItem) return <span className="text-xs text-muted-foreground">Bild</span>;
                          const product = getProductById(firstItem.productId);
                          if (product && product.imagesStock && product.imagesStock.length > 0) {
                            return (
                              <img
                                src={product.imagesStock[0]}
                                alt={firstItem.title}
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
                            );
                          }
                          return <span className="text-xs text-muted-foreground">Bild</span>;
                        })()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{order.items[0]?.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <Button 
                      type="button"
                      className="w-full" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShowDetails(order);
                      }}
                    >
                      Details anzeigen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

