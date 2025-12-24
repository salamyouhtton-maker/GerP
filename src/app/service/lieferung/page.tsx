import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LieferungPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Lieferung</h1>
        
        <div className="space-y-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Standardlieferung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Wir liefern Ihre Bestellung sicher und zuverlässig bis zur Haustür. 
                Die Standardlieferung erfolgt innerhalb von 3-5 Werktagen.
              </p>
              <div className="space-y-2">
                <p><strong>Kosten:</strong> Kostenlos</p>
                <p><strong>Lieferzeit:</strong> 3-5 Werktage</p>
                <p><strong>Lieferung:</strong> Bis zur Haustür</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Express-Lieferung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Für eilige Bestellungen bieten wir eine Express-Lieferung an.
              </p>
              <div className="space-y-2">
                <p><strong>Kosten:</strong> 70,00 €</p>
                <p><strong>Lieferzeit:</strong> 1-2 Werktage</p>
                <p><strong>Lieferung:</strong> Bis zur Haustür</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wichtige Hinweise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                • Bitte stellen Sie sicher, dass zum Lieferzeitpunkt jemand anwesend ist.
              </p>
              <p className="text-muted-foreground">
                • Die Geräte werden in der Originalverpackung oder einer Ersatzverpackung geliefert.
              </p>
              <p className="text-muted-foreground">
                • Bei der Anlieferung können Sie das Gerät auf offensichtliche Transportschäden prüfen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


