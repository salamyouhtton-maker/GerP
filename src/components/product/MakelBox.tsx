import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { discountReasons } from '@/data/discountReasons';

interface MakelBoxProps {
  product: Product;
}

export function MakelBox({ product }: MakelBoxProps) {
  const reason = discountReasons.find(r => r.id === product.discountReason);
  
  const severityColors = {
    leicht: 'bg-green-100 text-green-800 border-green-300',
    mittel: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    stark: 'bg-orange-100 text-orange-800 border-orange-300',
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Warum reduziert?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Grund:</span>
            <Badge variant="outline">{reason?.title || product.discountReason}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{product.defectSummaryShort}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Schweregrad:</span>
            <Badge className={severityColors[product.defectSeverity]}>
              {product.defectSeverity}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-md border border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">Funktion geprüft (Ja)</span>
        </div>

        {product.imagesStock && product.imagesStock.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Produkt-Foto:</p>
            <div className="relative w-full h-48 rounded-md overflow-hidden border bg-muted">
              <img
                src={product.imagesStock[0]}
                alt="Produkt-Foto"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            {product.imagesStock.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.imagesStock.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-16 bg-muted rounded overflow-hidden border"
                  >
                    <img
                      src={img}
                      alt={`${idx + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">{product.defectDetails}</p>
        </div>
      </CardContent>
    </Card>
  );
}


