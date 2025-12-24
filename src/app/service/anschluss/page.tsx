import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnschlussPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Anschluss & Installation</h1>
        
        <div className="space-y-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Professioneller Anschluss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Unsere geschulten Techniker schließen Ihr Gerät fachgerecht an und 
                stellen sicher, dass alles einwandfrei funktioniert.
              </p>
              <div className="space-y-2">
                <p><strong>Kosten:</strong> 99,00 €</p>
                <p><strong>Leistungsumfang:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Fachgerechter Anschluss an Wasser, Strom und Abwasser</li>
                  <li>Funktionsprüfung des Geräts</li>
                  <li>Kurze Einweisung in die Bedienung</li>
                  <li>Entsorgung der Verpackung</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Was wird angeschlossen?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                • Waschmaschinen: Wasseranschluss, Abwasser, Strom
              </p>
              <p className="text-muted-foreground">
                • Geschirrspüler: Wasseranschluss, Abwasser, Strom
              </p>
              <p className="text-muted-foreground">
                • Kühlschränke: Stromanschluss
              </p>
              <p className="text-muted-foreground">
                • Kaffeevollautomaten: Wasseranschluss, Strom
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voraussetzungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                • Vorhandene Anschlüsse (Wasser, Abwasser, Strom) am Aufstellort
              </p>
              <p className="text-muted-foreground">
                • Freier Zugang zum Aufstellort
              </p>
              <p className="text-muted-foreground">
                • Anwesenheit einer erwachsenen Person während der Installation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


