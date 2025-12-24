import { DiscountReasonInfo } from '@/lib/types';

export const discountReasons: DiscountReasonInfo[] = [
  {
    id: 'verpackung',
    title: 'Beschädigte Verpackung',
    description: 'Die Originalverpackung weist Beschädigungen auf, das Gerät selbst ist jedoch vollständig funktionsfähig.',
    slug: 'verpackung',
  },
  {
    id: 'transport',
    title: 'Transportmängel',
    description: 'Kleine Kratzer oder Dellen durch Transport entstanden. Die Funktionalität ist nicht beeinträchtigt.',
    slug: 'transport',
  },
  {
    id: 'ausstellung',
    title: 'Ausstellungsstück',
    description: 'Das Gerät wurde in unserem Showroom ausgestellt und zeigt leichte Gebrauchsspuren.',
    slug: 'ausstellung',
  },
  {
    id: 'retoure',
    title: 'Retoure',
    description: 'Das Gerät wurde vom Vorbesitzer zurückgegeben. Es wurde von uns geprüft und ist voll funktionsfähig.',
    slug: 'retoure',
  },
  {
    id: 'kleiner-makel',
    title: 'Kleiner Makel',
    description: 'Das Gerät weist einen kleinen optischen Makel auf, der die Funktionalität nicht beeinträchtigt.',
    slug: 'kleiner-makel',
  },
];


