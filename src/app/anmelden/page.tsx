import { Suspense } from 'react';
import AnmeldenForm from './AnmeldenForm';

export default function AnmeldenPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Laden...</div>}>
      <AnmeldenForm />
    </Suspense>
  );
}