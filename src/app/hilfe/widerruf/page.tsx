import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WiderrufPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Widerrufsrecht</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Widerrufsbelehrung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Widerrufsrecht</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen 
                diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage 
                ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht 
                der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Widerrufsfolgen</h3>
              <p className="text-muted-foreground">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, 
                die wir von Ihnen erhalten haben, einschließlich der Lieferkosten 
                (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass 
                Sie eine andere Art der Lieferung als die von uns angebotene, günstigste 
                Standardlieferung gewählt haben), unverzüglich und spätestens binnen 
                vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über 
                Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Rücksendung</h3>
              <p className="text-muted-foreground">
                Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen 
                vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses 
                Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. 
                Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von 
                vierzehn Tagen absenden.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Widerrufsformular</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Wenn Sie den Vertrag widerrufen möchten, füllen Sie bitte dieses 
              Formular aus und senden Sie es zurück.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">
                An: [Ihre Firma]<br />
                E-Mail: widerruf@example.com<br />
                <br />
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen 
                Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der 
                folgenden Dienstleistung (*):<br />
                <br />
                Bestellt am (*)/erhalten am (*):<br />
                Name des/der Verbraucher(s):<br />
                Anschrift des/der Verbraucher(s):<br />
                Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):<br />
                Datum:<br />
                <br />
                (*) Unzutreffendes streichen
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


