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

export function NewProductNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Проверяем, показывали ли уже уведомление в этой сессии
    try {
      const notificationShown = sessionStorage.getItem('newProductNotificationShown');
      
      if (notificationShown === 'true') {
        return;
      }

      // Устанавливаем таймер на 3 секунды (для быстрого тестирования)
      const timer = setTimeout(() => {
        console.log('Timer fired - opening notification');
        setIsOpen(true);
        try {
          sessionStorage.setItem('newProductNotificationShown', 'true');
        } catch (e) {
          console.error('Error setting sessionStorage:', e);
        }
      }, 3000); // 3 секунды для быстрого тестирования (измените обратно на 20000 для 20 секунд)

      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Error accessing sessionStorage:', e);
    }
  }, [isMounted]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleViewProducts = () => {
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Neues Produkt verfügbar! 🎉</DialogTitle>
          <DialogDescription className="pt-2">
            Wir haben ein neues Produkt zu unserem Sortiment hinzugefügt. 
            Schauen Sie sich unsere neuesten Angebote an!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild className="flex-1" onClick={handleViewProducts}>
            <Link href="/katalog">Zum Katalog</Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleClose}
          >
            Später
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

