'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { getCart, removeFromCart, updateCartItemQuantity, type CartItem } from '@/lib/cart';
import { getProductById } from '@/data/products';
import { type Product } from '@/lib/types';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartProduct extends CartItem {
  product: Product;
}

export default function WarenkorbPage() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const loadCart = () => {
    const cartItems = getCart();
    const products: CartProduct[] = cartItems
      .map(item => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is CartProduct => item !== null);

    setCartProducts(products);
    
    // Calculate subtotal
    const total = products.reduce((sum, item) => {
      return sum + (item.product.priceSale * item.quantity);
    }, 0);
    setSubtotal(total);
  };

  useEffect(() => {
    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
      loadCart();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Warenkorb</h1>
      
      {cartProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ihr Warenkorb ist leer.</p>
          <Button asChild>
            <Link href="/katalog">Zum Katalog</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      {item.product.imagesStock && item.product.imagesStock.length > 0 ? (
                        <img
                          src={item.product.imagesStock[0]}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Kein Bild
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        <Link href={`/produkt/${item.productId}`} className="hover:underline">
                          {item.product.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.product.brand}</p>
                      <p className="font-bold text-lg mb-4">{formatPrice(item.product.priceSale)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemove(item.productId)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <div className="ml-auto text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(item.product.priceSale * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Zusammenfassung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Gesamt</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/checkout">Zur Kasse</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}


