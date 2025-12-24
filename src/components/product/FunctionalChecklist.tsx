import { CheckCircle2 } from 'lucide-react';
import { FunctionalChecklist as FunctionalChecklistType } from '@/lib/types';

interface FunctionalChecklistProps {
  items: FunctionalChecklistType[];
}

export function FunctionalChecklist({ items }: FunctionalChecklistProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm mb-3">Funktion geprüft</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{item.item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


