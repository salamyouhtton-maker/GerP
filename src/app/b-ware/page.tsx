import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { discountReasons } from '@/data/discountReasons';

export default function BWarePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Warum günstiger?</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Unsere B-Ware Geräte sind vollständig funktionsfähig, wurden von uns geprüft 
          und weisen lediglich kleine Makel auf. Erfahren Sie mehr über die verschiedenen 
          Gründe für reduzierte Preise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {discountReasons.map((reason) => (
            <Link key={reason.id} href={`/b-ware/${reason.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Ihre Vorteile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Funktion geprüft</h3>
              <p className="text-sm text-muted-foreground">
                Alle Geräte werden von unseren Technikern vollständig geprüft. 
                Sie erhalten ein funktionsfähiges Gerät mit gesetzlicher Gewährleistung.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transparente Defektangaben</h3>
              <p className="text-sm text-muted-foreground">
                Wir zeigen Ihnen genau, welche Makel vorhanden sind und warum 
                das Gerät reduziert ist. Keine Überraschungen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Gesetzliche Gewährleistung</h3>
              <p className="text-sm text-muted-foreground">
                Auch bei B-Ware haben Sie Anspruch auf die gesetzliche Gewährleistung. 
                Wir stehen für die Qualität unserer Produkte ein.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


