'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getOrders } from '@/lib/orders';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClass } from '@/lib/orderStatus';
import { Order } from '@/lib/types';
import { SupportModal } from '@/components/support/SupportModal';
import { isLoggedIn } from '@/lib/user';

export default function KontoPage() {
  const router = useRouter();
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/registrieren');
      return;
    }
  }, [router]);

  useEffect(() => {
    // Load orders from localStorage on mount and update when orders change
    const loadOrders = () => {
      const allOrders = getOrders();
      if (allOrders.length > 0) {
        setLastOrder(allOrders[0]);
      } else {
        setLastOrder(null);
      }
    };

    loadOrders();

    // Listen for order updates (custom event)
    const handleOrderUpdate = () => {
      loadOrders();
    };

    window.addEventListener('orderUpdated', handleOrderUpdate);

    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Mein Konto</h1>
        <p className="text-muted-foreground mb-8">
          Hier verwalten Sie Bestellungen, Retouren und Ihre Daten.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/konto">Übersicht</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/konto/bestellungen">Bestellungen</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/hilfe/widerruf">Retouren & Widerruf</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/konto/daten">Persönliche Daten</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/konto/adressen">Adressen</Link>
                </Button>
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsSupportModalOpen(true)}
                  >
                    Support kontaktieren
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Last Order */}
            {lastOrder && (
              <Card>
                <CardHeader>
                  <CardTitle>Letzte Bestellung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Bestellung {lastOrder.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">Vom {lastOrder.date}</p>
                    </div>
                    <Badge className={getStatusBadgeClass(lastOrder.status)}>
                      {lastOrder.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">Bild</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{lastOrder.items[0]?.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{formatPrice(lastOrder.total)}</p>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/konto/bestellungen">Zur Bestellung</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bestellungen ansehen</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/konto/bestellungen">Alle Bestellungen</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adressen verwalten</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/konto/adressen">Adressen</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Retouren & Widerruf</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/hilfe/widerruf">Mehr erfahren</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <SupportModal
        open={isSupportModalOpen}
        onOpenChange={setIsSupportModalOpen}
      />
    </div>
  );
}


