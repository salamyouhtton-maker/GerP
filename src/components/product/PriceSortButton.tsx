'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export function PriceSortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || '';

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentSort === 'price-asc') {
      // Если уже отсортировано по возрастанию, убираем сортировку
      params.delete('sort');
    } else {
      // Сортируем по возрастанию цены
      params.set('sort', 'price-asc');
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleSort}
      className="flex items-center gap-2"
    >
      <ArrowUpDown className="h-4 w-4" />
      {currentSort === 'price-asc' ? 'Sortierung aufheben' : 'Nach Preis sortieren'}
    </Button>
  );
}

