import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FAQPage() {
  const faqs = [
    {
      question: 'Was ist B-Ware?',
      answer: 'B-Ware sind Geräte mit kleinen Makeln, die vollständig funktionsfähig sind. Diese können durch Transport, Ausstellung, Retoure oder kleine optische Mängel entstanden sein.',
    },
    {
      question: 'Sind die Geräte funktionsfähig?',
      answer: 'Ja, alle Geräte werden von unseren Technikern vollständig geprüft und sind funktionsfähig. Wir zeigen Ihnen transparent, welche Makel vorhanden sind.',
    },
    {
      question: 'Habe ich Gewährleistung?',
      answer: 'Ja, auch bei B-Ware haben Sie Anspruch auf die gesetzliche Gewährleistung von 24 Monaten ab Kaufdatum.',
    },
    {
      question: 'Kann ich die Ware zurückgeben?',
      answer: 'Ja, Sie haben ein 14-tägiges Widerrufsrecht. Die Ware muss in unverändertem Zustand zurückgegeben werden.',
    },
    {
      question: 'Wie funktioniert die Lieferung?',
      answer: 'Wir liefern Ihre Bestellung innerhalb von 3-5 Werktagen bis zur Haustür. Optional können Sie auch einen Anschluss-Service oder Altgeräte-Entsorgung buchen.',
    },
    {
      question: 'Welche Zahlungsmethoden werden akzeptiert?',
      answer: 'Wir akzeptieren Kreditkarte, Lastschrift, PayPal und Vorkasse. Alle Zahlungen werden sicher über verschlüsselte Verbindungen abgewickelt.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Häufig gestellte Fragen</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


