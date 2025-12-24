'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { formatPrice, calculateSavings } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const savings = calculateSavings(product.priceOriginal, product.priceSale);
  
  const gradeColors = {
    A: 'bg-green-100 text-green-800 border-2 border-green-300',
    B: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300',
    C: 'bg-orange-100 text-orange-800 border-2 border-orange-300',
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <Link href={`/produkt/${product.id}`} className="block relative">
          <div className="relative w-full h-64 bg-muted rounded-t-md overflow-hidden">
            {(() => {
              // Use imagesStock[0] as main image
              const imageToShow = product.imagesStock && product.imagesStock.length > 0
                ? product.imagesStock[0]
                : null;
              
              if (imageToShow && !imageError) {
                return (
                  <img
                    src={imageToShow}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    onError={() => {
                      console.error(`[ProductCard] Failed to load image for product ${product.id}:`, imageToShow);
                      setImageError(true);
                    }}
                    onLoad={() => {
                      if (process.env.NODE_ENV === 'development') {
                        console.log(`[ProductCard] Image loaded successfully for product ${product.id}:`, imageToShow);
                      }
                    }}
                  />
                );
              }
              return (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Kein Bild
                </div>
              );
            })()}
            <div className="absolute top-2 right-2 z-10 pointer-events-none">
              <Badge className={gradeColors[product.conditionGrade]}>
                Zustand {product.conditionGrade}
              </Badge>
            </div>
            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              <Badge variant="destructive">-{savings}%</Badge>
            </div>
            {product.specialBadge === 'super' && (
              <div className="absolute top-12 left-2 z-10 pointer-events-none">
                <Badge className="bg-orange-500 text-white border-2 border-orange-600 font-bold">
                  Super Angebot
                </Badge>
              </div>
            )}
            {product.specialBadge === 'best' && (
              <div className="absolute top-12 left-2 z-10 pointer-events-none">
                <Badge className="bg-blue-600 text-white border-2 border-blue-700 font-bold">
                  Bestes Angebot
                </Badge>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/produkt/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold">{formatPrice(product.priceSale)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.priceOriginal)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Warum reduziert? {product.defectSummaryShort}
          </p>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Funktion geprüft</span>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/produkt/${product.id}`}>Details ansehen</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


