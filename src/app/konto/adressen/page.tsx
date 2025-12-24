'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trash2, Star } from 'lucide-react';
import { getAddresses, removeAddress, setDefaultAddress, type Address } from '@/lib/addresses';
import { isLoggedIn } from '@/lib/user';

export default function AdressenPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/registrieren');
      return;
    }
  }, [router]);

  const loadAddresses = () => {
    setAddresses(getAddresses());
  };

  useEffect(() => {
    loadAddresses();

    // Listen for address updates
    const handleAddressUpdate = () => {
      loadAddresses();
    };

    window.addEventListener('addressesUpdated', handleAddressUpdate);

    return () => {
      window.removeEventListener('addressesUpdated', handleAddressUpdate);
    };
  }, []);

  const handleRemove = (addressId: string) => {
    if (confirm('Möchten Sie diese Adresse wirklich löschen?')) {
      removeAddress(addressId);
      loadAddresses();
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId);
    loadAddresses();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/konto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Adressen</h1>

        {addresses.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Ihre Adressen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Sie haben noch keine Adressen gespeichert. Adressen werden automatisch gespeichert, wenn Sie eine Bestellung aufgeben.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {address.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-300 mb-2">
                          Standardadresse
                        </Badge>
                      )}
                      <div className="space-y-1">
                        <p className="font-semibold text-lg">{address.name}</p>
                        <p className="text-muted-foreground">{address.street}</p>
                        <p className="text-muted-foreground">
                          {address.postalCode} {address.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSetDefault(address.id)}
                          title="Als Standardadresse festlegen"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(address.id)}
                        className="text-destructive hover:text-destructive"
                        title="Adresse löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

