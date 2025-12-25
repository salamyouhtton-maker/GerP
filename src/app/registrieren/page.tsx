import { Suspense } from 'react';
import RegistrierenForm from './RegistrierenForm';

export default function RegistrierenPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Laden...</div>}>
      <RegistrierenForm />
    </Suspense>
  );
}