'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { discountReasons } from '@/data/discountReasons';
import { Category, ConditionGrade, DiscountReason } from '@/lib/types';

export function FiltersSidebar({ category }: { category?: Category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceMin, setPriceMin] = useState(searchParams.get('price_min') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('price_max') || '');
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || 'all');
  const [selectedGrade, setSelectedGrade] = useState<ConditionGrade | 'all'>(searchParams.get('grade') as ConditionGrade || 'all');
  const [selectedReason, setSelectedReason] = useState<DiscountReason | 'all'>(searchParams.get('reason') as DiscountReason || 'all');

  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  const brands = Array.from(new Set(filteredProducts.map(p => p.brand))).sort();
  const minPrice = Math.min(...filteredProducts.map(p => p.priceSale));
  const maxPrice = Math.max(...filteredProducts.map(p => p.priceSale));

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);
    if (selectedBrand && selectedBrand !== 'all') params.set('brand', selectedBrand);
    if (selectedGrade !== 'all') params.set('grade', selectedGrade);
    if (selectedReason !== 'all') params.set('reason', selectedReason);

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedBrand('all');
    setSelectedGrade('all');
    setSelectedReason('all');
    router.push('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="price-min">Preis von (€)</Label>
          <Input
            id="price-min"
            type="number"
            placeholder={minPrice.toString()}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price-max">Preis bis (€)</Label>
          <Input
            id="price-max"
            type="number"
            placeholder={maxPrice.toString()}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="brand">Marke</Label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="Alle Marken" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Marken</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="grade">Zustand</Label>
          <Select value={selectedGrade} onValueChange={(value) => setSelectedGrade(value as ConditionGrade | 'all')}>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Alle Zustände" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Zustände</SelectItem>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="reason">Reduzierungsgrund</Label>
          <Select value={selectedReason} onValueChange={(value) => setSelectedReason(value as DiscountReason | 'all')}>
            <SelectTrigger id="reason">
              <SelectValue placeholder="Alle Gründe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Gründe</SelectItem>
              {discountReasons.map((reason) => (
                <SelectItem key={reason.id} value={reason.id}>
                  {reason.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">Anwenden</Button>
          <Button onClick={clearFilters} variant="outline">Zurücksetzen</Button>
        </div>
      </CardContent>
    </Card>
  );
}


