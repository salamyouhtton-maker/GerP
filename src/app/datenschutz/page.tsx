import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Datenschutz auf einen Blick</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
                <p className="text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit 
                  Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. 
                  Personenbezogene Daten sind alle Daten, mit denen Sie persönlich 
                  identifiziert werden können.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Datenerfassung auf dieser Website</h3>
                <p className="text-muted-foreground">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                  Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen 
                  Stelle" in dieser Datenschutzerklärung entnehmen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Verantwortliche Stelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="text-muted-foreground mt-4">
              B-Ware Shop Musterfirma<br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              Deutschland<br />
              <br />
              Telefon: +49 (0) 123 456789<br />
              E-Mail: info@example.com
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Datenerfassung auf dieser Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Cookies</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt technisch notwendige Cookies. Weitere Informationen 
                finden Sie in unserer Cookie-Richtlinie.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Kontaktformular</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre 
                Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen 
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von 
                Anschlussfragen bei uns gespeichert.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Ihre Rechte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sie haben jederzeit das Recht, Auskunft über Ihre bei uns gespeicherten 
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der 
              Datenverarbeitung sowie ein Recht auf Berichtigung, Löschung oder 
              Einschränkung der Verarbeitung zu erhalten.
            </p>
            <p className="text-muted-foreground">
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


