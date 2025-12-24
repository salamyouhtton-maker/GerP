import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Angaben gemäß § 5 TMG</h3>
              <p className="text-muted-foreground">
                B-Ware Shop Musterfirma<br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Kontakt</h3>
              <p className="text-muted-foreground">
                Telefon: +49 (0) 123 456789<br />
                E-Mail: info@example.com
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Registereintrag</h3>
              <p className="text-muted-foreground">
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Musterstadt<br />
                Registernummer: HRB 12345
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Umsatzsteuer-ID</h3>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE 123456789
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Verantwortlich für den Inhalt</h3>
              <p className="text-muted-foreground">
                Max Mustermann<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


