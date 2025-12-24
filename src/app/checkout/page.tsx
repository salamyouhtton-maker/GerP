'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';
import { getCart, type CartItem } from '@/lib/cart';
import { getProductById } from '@/data/products';
import { PaymentModal } from '@/components/checkout/PaymentModal';

interface CartProduct extends CartItem {
  product: ReturnType<typeof getProductById>;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    deliveryTime: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const shipping = 0; // Free shipping for now

  useEffect(() => {
    const cartItems = getCart();
    const products: CartProduct[] = cartItems
      .map(item => {
        const product = getProductById(item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((item): item is CartProduct => item !== null);

    setCartProducts(products);
    
    // Calculate subtotal
    const total = products.reduce((sum, item) => {
      return sum + (item.product.priceSale * item.quantity);
    }, 0);
    setSubtotal(total);

    // Redirect to cart if empty
    if (products.length === 0) {
      router.push('/warenkorb');
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Straße & Hausnummer ist erforderlich';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'PLZ ist erforderlich';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Stadt ist erforderlich';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer';
    }
    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'Bitte wählen Sie eine Lieferzeit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validateForm()) {
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const getOrderData = () => {
    return {
      items: cartProducts.map(item => ({
        productId: item.productId,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.priceSale,
      })),
      subtotal,
      shipping,
      total: subtotal + shipping,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      phone: formData.phone,
      deliveryTime: formData.deliveryTime,
    };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Kasse</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lieferadresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Straße & Hausnummer *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && (
                  <p className="text-sm text-red-500">{errors.street}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">PLZ *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={errors.postalCode ? 'border-red-500' : ''}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Stadt *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+49 123 456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Lieferzeit *</Label>
                <Select
                  value={formData.deliveryTime}
                  onValueChange={(value) => handleInputChange('deliveryTime', value)}
                >
                  <SelectTrigger className={errors.deliveryTime ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Bitte wählen Sie eine Lieferzeit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00-12:00">09:00 - 12:00</SelectItem>
                    <SelectItem value="12:00-15:00">12:00 - 15:00</SelectItem>
                    <SelectItem value="15:00-18:00">15:00 - 18:00</SelectItem>
                    <SelectItem value="18:00-20:00">18:00 - 20:00</SelectItem>
                  </SelectContent>
                </Select>
                {errors.deliveryTime && (
                  <p className="text-sm text-red-500">{errors.deliveryTime}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Dies ist eine vorläufige Zeit. Der Kurier wird Sie anrufen, um die genaue Zeit zu bestätigen.
                </p>
              </div>
              <Button onClick={handleOrder} className="w-full" size="lg">
                Bestellen
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Zusammenfassung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cartProducts.map((item) => (
                  <div key={item.productId} className="flex gap-2 text-sm">
                    <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                      {item.product.imagesStock && item.product.imagesStock.length > 0 ? (
                        <img
                          src={item.product.imagesStock[0]}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Bild
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.product.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.quantity} x {formatPrice(item.product.priceSale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Zwischensumme</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Versand</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    Kostenlos
                  </Badge>
                </div>
                <span className="font-semibold text-green-600">{formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Gesamt</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        orderData={getOrderData()}
      />
    </div>
  );
}


