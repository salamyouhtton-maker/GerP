import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AltgeraetePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Altgeräte-Entsorgung</h1>
        
        <div className="space-y-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Umweltgerechte Entsorgung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Wir übernehmen die umweltgerechte Entsorgung Ihres alten Geräts. 
                Dies erfolgt im Rahmen der gesetzlichen Vorgaben und ist kostenpflichtig.
              </p>
              <div className="space-y-2">
                <p><strong>Kosten:</strong> 29,00 €</p>
                <p><strong>Leistungsumfang:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Abholung des Altgeräts am Aufstellort</li>
                  <li>Umweltgerechte Entsorgung</li>
                  <li>Entsorgungsnachweis</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voraussetzungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                • Das Altgerät muss am Aufstellort zugänglich sein
              </p>
              <p className="text-muted-foreground">
                • Das Gerät muss vollständig entleert sein (bei Kühlschränken, Waschmaschinen, etc.)
              </p>
              <p className="text-muted-foreground">
                • Die Abholung erfolgt zeitgleich mit der Lieferung des neuen Geräts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gesetzliche Vorgaben</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gemäß ElektroG (Elektro- und Elektronikgerätegesetz) sind wir verpflichtet, 
                Altgeräte umweltgerecht zu entsorgen. Die Kosten hierfür werden separat 
                berechnet und sind nicht in den Produktpreisen enthalten.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


