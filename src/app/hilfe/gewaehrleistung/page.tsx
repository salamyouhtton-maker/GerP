import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GewaehrleistungPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gewährleistung</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Gesetzliche Gewährleistung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Gewährleistungsdauer</h3>
              <p className="text-muted-foreground">
                Die gesetzliche Gewährleistungsfrist beträgt 24 Monate ab Lieferung 
                der Ware. Innerhalb dieser Frist haften wir für Mängel, die bereits 
                zum Zeitpunkt der Lieferung vorhanden waren.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Gewährleistungsansprüche</h3>
              <p className="text-muted-foreground">
                Bei Mängeln haben Sie folgende Rechte:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mt-2">
                <li>Nacherfüllung (Reparatur oder Ersatzlieferung)</li>
                <li>Minderung des Kaufpreises</li>
                <li>Rücktritt vom Vertrag (bei erheblichen Mängeln)</li>
                <li>Schadensersatz (bei Verschulden des Verkäufers)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Beweislastumkehr</h3>
              <p className="text-muted-foreground">
                Innerhalb der ersten 12 Monate nach Lieferung wird vermutet, dass 
                ein Mangel bereits zum Zeitpunkt der Lieferung vorhanden war, es 
                sei denn, diese Vermutung ist mit der Art der Sache oder des Mangels 
                unvereinbar.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>B-Ware und Gewährleistung</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Auch bei B-Ware gelten die gesetzlichen Gewährleistungsrechte. 
              Die bekannten und transparent kommunizierten Makel (z.B. Kratzer, 
              Dellen) sind jedoch kein Mangel im rechtlichen Sinne, da diese 
              bereits vor dem Kauf bekannt gegeben wurden und im Preis berücksichtigt sind.
            </p>
            <p className="text-muted-foreground mt-4">
              Für funktionale Mängel, die nicht vorhersehbar waren, gelten die 
              vollen gesetzlichen Gewährleistungsrechte.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


