import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Seite nicht gefunden</h1>
      <p className="text-muted-foreground mb-8">
        Die angeforderte Seite konnte nicht gefunden werden.
      </p>
      <Button asChild>
        <Link href="/">Zur Startseite</Link>
      </Button>
    </div>
  );
}


