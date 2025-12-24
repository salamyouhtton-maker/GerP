'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProductById } from '@/data/products';
import { formatPrice, calculateSavings } from '@/lib/utils';

export function BestOfferNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Проверяем, показывали ли уже уведомление в этой сессии
    try {
      const notificationShown = sessionStorage.getItem('bestOfferNotificationShown');
      
      if (notificationShown === 'true') {
        return;
      }

      let scrollStartTime: number | null = null;
      let scrollTimer: NodeJS.Timeout | null = null;
      let hasScrolled = false;

      const handleScroll = () => {
        // Если это первый скролл, запоминаем время начала
        if (!hasScrolled) {
          hasScrolled = true;
          scrollStartTime = Date.now();
          
          // Устанавливаем таймер на 60 секунд после первого скролла
          scrollTimer = setTimeout(() => {
            setIsOpen(true);
            try {
              sessionStorage.setItem('bestOfferNotificationShown', 'true');
            } catch (e) {
              console.error('Error setting sessionStorage:', e);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
          }, 60000); // 60 секунд = 1 минута
        }
      };

      // Отслеживаем скролл
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Также отслеживаем wheel события для более точного определения скролла
      window.addEventListener('wheel', handleScroll, { passive: true });

      return () => {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('wheel', handleScroll);
      };
    } catch (e) {
      console.error('Error accessing sessionStorage:', e);
    }
  }, [isMounted]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleViewProduct = () => {
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  const product = getProductById('wm-021'); // LG F2V7SLIM9B с пометкой "лучшее предложение"
  if (!product) {
    return null;
  }

  const savings = calculateSavings(product.priceOriginal, product.priceSale);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Bestes Angebot! ⭐</DialogTitle>
          <DialogDescription className="pt-2">
            Wir haben ein besonderes Angebot für Sie gefunden!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            {product.imagesStock && product.imagesStock.length > 0 && (
              <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={product.imagesStock[0]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold">{formatPrice(product.priceSale)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.priceOriginal)}
                </span>
                <span className="text-sm font-semibold text-blue-600">-{savings}%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild className="flex-1" onClick={handleViewProduct}>
              <Link href={`/produkt/${product.id}`}>Zum Produkt</Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleClose}
            >
              Später
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

