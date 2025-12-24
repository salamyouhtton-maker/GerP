'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MakelBox } from '@/components/product/MakelBox';
import { FunctionalChecklist } from '@/components/product/FunctionalChecklist';
import { DeliveryServiceOptions } from '@/components/checkout/DeliveryServiceOptions';
import { getProductById } from '@/data/products';
import { formatPrice, calculateSavings } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { addToCart } from '@/lib/cart';
import { isLoggedIn } from '@/lib/user';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<ReturnType<typeof getProductById>>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
      const productData = getProductById(resolvedParams.id);
      if (!productData) {
        setNotFound(true);
        return;
      }
      setProduct(productData);
      setSelectedImageIndex(0); // Reset to first image when product changes
    }
    loadProduct();
  }, [params]);

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
        <Button asChild>
          <a href="/katalog">Zum Katalog</a>
        </Button>
      </div>
    );
  }

  if (!productId || !product) {
    return <div className="container mx-auto px-4 py-12">Laden...</div>;
  }

  if (!product) {
    notFound();
  }

  const savings = calculateSavings(product.priceOriginal, product.priceSale);

  const gradeColors = {
    A: 'bg-green-100 text-green-800 border-green-300',
    B: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    C: 'bg-orange-100 text-orange-800 border-orange-300',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Defect Images */}
        <div className="space-y-4">
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {(() => {
              // Priority: imagesRealDefect[0] > imagesStock[0]
              const imageToShow = 
                (product.imagesRealDefect && product.imagesRealDefect.length > 0) 
                  ? product.imagesRealDefect[0]
                  : (product.imagesStock && product.imagesStock.length > 0)
                    ? product.imagesStock[0]
                    : null;
              
              if (imageToShow) {
                return (
                  <img
                    src={imageToShow}
                    alt={product.imagesRealDefect && product.imagesRealDefect.length > 0 ? "Makel-Foto" : product.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-muted-foreground">Kein Bild verfügbar</div>';
                      }
                    }}
                  />
                );
              }
              return (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Kein Bild verfügbar
                </div>
              );
            })()}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{formatPrice(product.priceSale)}</span>
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.priceOriginal)}
              </span>
              <Badge variant="destructive">-{savings}%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Sie sparen {formatPrice(product.priceOriginal - product.priceSale)}
            </p>
          </div>

          <Separator />

          {/* MakelBox - Above the fold */}
          <MakelBox product={product} />

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Funktion geprüft</span>
            </div>
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => {
                  addToCart(product.id, 1);
                  if (isLoggedIn()) {
                    router.push('/checkout');
                  } else {
                    router.push('/registrieren?from=buynow');
                  }
                }}
              >
                Jetzt kaufen
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => {
                  addToCart(product.id, 1);
                  router.push('/warenkorb');
                }}
              >
                In den Warenkorb
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Details */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specifications">Technische Daten</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Beschreibung</h3>
              <p className="text-muted-foreground">{product.description || 'Keine Beschreibung verfügbar.'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Funktion geprüft</h3>
              <FunctionalChecklist items={product.functionalChecklist} />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Lieferumfang</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {product.includedItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="space-y-4">
            {product.specifications && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            )}
            {product.energyClass && (
              <div>
                <p className="font-medium">Energieeffizienzklasse: {product.energyClass}</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="service" className="mt-6">
          <DeliveryServiceOptions />
        </TabsContent>
      </Tabs>
    </div>
  );
}


