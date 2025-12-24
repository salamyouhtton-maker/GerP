import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AGBPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>§ 1 Geltungsbereich, Vertragspartner</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten 
              für alle Verträge über die Lieferung von Waren, die ein Verbraucher oder 
              Unternehmer (nachfolgend "Kunde") mit dem Unternehmer (nachfolgend 
              "Verkäufer") über dessen Online-Shop abschließt.
            </p>
            <p className="text-muted-foreground mt-4">
              (2) Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu 
              Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer 
              selbständigen beruflichen Tätigkeit zugerechnet werden können.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>§ 2 Vertragsgegenstand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              (1) Der Verkäufer bietet B-Ware Hausgeräte an. Die Angebote richten sich 
              ausschließlich an Verbraucher.
            </p>
            <p className="text-muted-foreground mt-4">
              (2) Alle angebotenen Geräte sind vollständig funktionsfähig, wurden von 
              uns geprüft und weisen lediglich kleine Makel auf, die transparent 
              kommuniziert werden.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>§ 3 Vertragsschluss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              (1) Der Kunde kann aus unserem Sortiment eine Auswahl treffen und die 
              ausgewählten Waren über die Funktion "In den Warenkorb" in einen 
              Warenkorb legen.
            </p>
            <p className="text-muted-foreground mt-4">
              (2) Durch Anklicken der Schaltfläche "Zur Kasse" gelangt der Kunde zur 
              Bestellübersicht. Vor Absenden der Bestellung kann der Kunde die Daten 
              jederzeit ändern und einsehen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>§ 4 Preise und Zahlungsbedingungen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              (1) Alle Preise verstehen sich in Euro inklusive der gesetzlichen 
              Mehrwertsteuer zuzüglich Versandkosten.
            </p>
            <p className="text-muted-foreground mt-4">
              (2) Die Zahlung erfolgt per Vorkasse, Kreditkarte, Lastschrift oder PayPal.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>§ 5 Lieferung</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              (1) Die Lieferung erfolgt innerhalb Deutschlands. Die Lieferzeit beträgt 
              in der Regel 3-5 Werktage.
            </p>
            <p className="text-muted-foreground mt-4">
              (2) Die Versandkosten werden dem Kunden im Rahmen des Bestellprozesses 
              mitgeteilt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


