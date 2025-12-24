'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, CreditCard, Building2, Wallet, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { createOrder } from '@/data/orders';
import { clearCart } from '@/lib/cart';
import { getUser } from '@/lib/user';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
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
  };
}

type PaymentMethod = 'bank_transfer' | 'card' | 'paypal' | null;

export function PaymentModal({ open, onOpenChange, orderData }: PaymentModalProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [cvvError, setCvvError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCvvLoading, setIsCvvLoading] = useState(false);

  const handleCvvChange = (value: string) => {
    // Only allow digits, max 3 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
    setCardData(prev => ({ ...prev, cvv: digitsOnly }));

    // Show loading and then error when 3rd digit is entered
    if (digitsOnly.length === 3) {
      setIsCvvLoading(true);
      setCvvError(false);
      
      // After 6 seconds, show error
      setTimeout(() => {
        setIsCvvLoading(false);
        setCvvError(true);
      }, 6000);
    } else {
      setIsCvvLoading(false);
      setCvvError(false);
    }
  };

  const handlePaymentConfirmed = async () => {
    setIsProcessing(true);

    try {
      // Create order
      const order = createOrder({
        ...orderData,
        paymentMethod: selectedMethod!,
      });

      // Get user email
      const user = getUser();
      const userEmail = user?.email || '';

      // Send confirmation email
      if (userEmail) {
        try {
          await fetch('/api/order-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderNumber: order.orderNumber,
              email: userEmail,
              items: order.items,
              total: order.total,
              shippingAddress: order.shippingAddress,
              phone: order.phone,
              deliveryTime: order.deliveryTime,
            }),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't block order creation if email fails
        }
      }

      // Clear cart
      clearCart();

      // Close modal
      onOpenChange(false);

      // Redirect to orders page
      router.push('/konto/bestellungen');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsProcessing(false);
    }
  };

  const bankDetails = {
    iban: 'DE89 3704 0044 0532 0130 00',
    bic: 'COBADEFFXXX',
    bankName: 'Commerzbank AG',
    accountHolder: 'B-Ware Outlet GmbH',
    purpose: 'Bestellung',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zahlungsmethode wählen</DialogTitle>
          <DialogDescription>
            Wählen Sie Ihre bevorzugte Zahlungsmethode
          </DialogDescription>
        </DialogHeader>

        {!selectedMethod ? (
          <div className="space-y-4 mt-4">
            {/* Bank Transfer Option */}
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedMethod === 'bank_transfer' ? 'border-primary border-2' : ''
              }`}
              onClick={() => setSelectedMethod('bank_transfer')}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Building2 className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">Banküberweisung</h3>
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          0% Gebühren
                        </Badge>
                        <Badge variant="outline" className="border-blue-500 text-blue-600">
                          Empfohlen
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Überweisen Sie den Betrag direkt auf unser Bankkonto. Keine zusätzlichen Gebühren.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Payment Option */}
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedMethod === 'card' ? 'border-primary border-2' : ''
              }`}
              onClick={() => setSelectedMethod('card')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Kreditkarte</h3>
                      <span className="text-xs text-muted-foreground">Visa / Mastercard</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bezahlen Sie sicher mit Ihrer Kreditkarte
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PayPal Option (Disabled) */}
            <Card className="opacity-50 cursor-not-allowed">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Wallet className="h-6 w-6 text-muted-foreground mt-1" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-muted-foreground">PayPal</h3>
                      <Badge variant="outline" className="border-gray-300 text-gray-500">
                        Nicht verfügbar
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Diese Zahlungsmethode ist vorübergehend nicht verfügbar. Wir entschuldigen uns für die Unannehmlichkeiten.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedMethod === 'bank_transfer' ? (
          <div className="space-y-4 mt-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedMethod(null)}
              className="mb-4"
            >
              ← Zurück zur Auswahl
            </Button>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Bankverbindung</h3>
                </div>

                <div className="space-y-3 bg-muted p-4 rounded-md">
                  <div>
                    <Label className="text-xs text-muted-foreground">Kontoinhaber</Label>
                    <p className="font-medium">{bankDetails.accountHolder}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">IBAN</Label>
                    <p className="font-medium font-mono">{bankDetails.iban}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">BIC</Label>
                    <p className="font-medium font-mono">{bankDetails.bic}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Bank</Label>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Verwendungszweck</Label>
                    <p className="font-medium">{bankDetails.purpose}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <Label className="text-xs text-muted-foreground">Zu überweisender Betrag</Label>
                    <p className="font-bold text-lg">{formatPrice(orderData.total)}</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handlePaymentConfirmed}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Wird verarbeitet...' : 'Ich habe überwiesen'}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : selectedMethod === 'card' ? (
          <div className="space-y-4 mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedMethod(null);
                setCvvError(false);
                setIsCvvLoading(false);
                setCardData({ number: '', expiry: '', cvv: '' });
              }}
              className="mb-4"
            >
              ← Zurück zur Auswahl
            </Button>

            {isCvvLoading ? (
              <Card className="border-blue-500 border-2">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Zahlung wird verarbeitet...
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Bitte warten Sie einen Moment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : cvvError ? (
              <Card className="border-red-500 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-600 mb-2">
                        Zahlung fehlgeschlagen
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Bitte versuchen Sie einen anderen Zahlungsweg.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedMethod(null);
                          setCvvError(false);
                          setIsCvvLoading(false);
                          setCardData({ number: '', expiry: '', cvv: '' });
                        }}
                      >
                        Andere Zahlungsmethode wählen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Kreditkartendaten</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Kartennummer</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                        setCardData(prev => ({ ...prev, number: formatted }));
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Ablaufdatum</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setCardData(prev => ({ ...prev, expiry: value }));
                        }}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        maxLength={3}
                        className={cvvError ? 'border-red-500' : ''}
                      />
                      {cvvError && (
                        <p className="text-xs text-red-500">Fehler beim CVV</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Visa und Mastercard werden akzeptiert</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

