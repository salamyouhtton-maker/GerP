import { Shield, CreditCard, CheckCircle, FileText } from 'lucide-react';

export function TrustBar() {
  const trustItems = [
    {
      icon: Shield,
      text: '14 Tage Widerrufsrecht',
    },
    {
      icon: CreditCard,
      text: 'Sichere Zahlung',
    },
    {
      icon: CheckCircle,
      text: 'Funktion geprüft',
    },
    {
      icon: FileText,
      text: 'Gesetzliche Gewährleistung',
    },
  ];

  return (
    <div className="border-b bg-blue-50 border-blue-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-blue-300">|</span>}
                <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                <span className="font-medium text-foreground">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


