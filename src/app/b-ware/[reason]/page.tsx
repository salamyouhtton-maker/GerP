import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { discountReasons } from '@/data/discountReasons';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

interface ReasonPageProps {
  params: Promise<{ reason: string }>;
}

export default async function ReasonPage({ params }: ReasonPageProps) {
  const { reason: reasonSlug } = await params;
  const reason = discountReasons.find(r => r.slug === reasonSlug);

  if (!reason) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.discountReason === reason.id).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">{reason.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{reason.description}</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Was bedeutet das für Sie?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Geräte mit diesem Reduzierungsgrund wurden von uns vollständig geprüft 
              und sind funktionsfähig. Der Makel beeinträchtigt die Nutzung nicht.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm font-medium text-green-800">
                ✓ Funktion geprüft ✓ Gesetzliche Gewährleistung ✓ 14 Tage Widerrufsrecht
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Produkte mit diesem Grund</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


