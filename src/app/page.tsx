import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { calculateSavings } from '@/lib/utils';
import { type Product } from '@/lib/types';

export default function HomePage() {
  // Находим пылесос за 76 евро для второй позиции
  const vacuum76 = products.find(p => p.category === 'Staubsauger' && p.priceSale === 76.00);
  
  // Выбираем продукты: приоритет стиральным машинкам (самые дешевые), кофемашины только одна в конце
  const waschmaschinen = products
    .filter(p => p.category === 'Waschmaschinen')
    .sort((a, b) => a.priceSale - b.priceSale) // Сортировка по цене (самые дешевые первыми)
    .slice(0, 5); // Берем до 5 стиральных машинок
  
  const otherProducts = products
    .filter(p => p.category !== 'Waschmaschinen' && p.category !== 'Kaffeevollautomaten' && p.id !== vacuum76?.id)
    .sort((a, b) => {
      const savingsA = calculateSavings(a.priceOriginal, a.priceSale);
      const savingsB = calculateSavings(b.priceOriginal, b.priceSale);
      if (savingsB !== savingsA) {
        return savingsB - savingsA;
      }
      return a.priceSale - b.priceSale;
    });
  
  // Одна кофемашина в конце (самая дешевая)
  const coffeeMachines = products
    .filter(p => p.category === 'Kaffeevollautomaten')
    .sort((a, b) => a.priceSale - b.priceSale)
    .slice(0, 1);
  
  // Объединяем: первая стиральная машинка + пылесос за 76€ (вторая позиция) + остальные стиральные машинки + другие продукты + одна кофемашина
  const featuredProducts: Product[] = [
    waschmaschinen[0], // Первая позиция - самая дешевая стиральная машинка
    vacuum76, // Вторая позиция - пылесос за 76€
    ...waschmaschinen.slice(1), // Остальные стиральные машинки
    ...otherProducts.slice(0, 6 - waschmaschinen.length - (vacuum76 ? 1 : 0) - coffeeMachines.length),
    ...coffeeMachines,
  ].filter((product): product is Product => product !== undefined).slice(0, 6); // Убираем undefined и ограничиваем до 6

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Geprüfte Hausgeräte mit kleinen Makeln
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transparente Defektangaben, vollständige Funktionsprüfung und gesetzliche Gewährleistung. 
              Sparen Sie bis zu 70% bei hochwertigen Markengeräten.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="px-8 py-6 text-lg font-semibold">
                <Link href="/katalog">Zum Katalog</Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg font-semibold border-2">
                <Link href="/b-ware">Warum günstiger?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Empfohlene Produkte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts
              .filter((p): p is Product => Boolean(p))
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/katalog">Alle Produkte ansehen</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


