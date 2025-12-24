'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setUser, getUser } from '@/lib/user';

export default function AnmeldenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here to verify credentials
      // For now, we'll check if user exists in localStorage (from registration)
      const existingUser = getUser();
      
      // If user exists and email matches, use existing data
      // Otherwise, create a simple user object (in real app, this would come from API)
      if (existingUser && existingUser.email === formData.email) {
        // User already registered, use existing data
        setUser({
          ...existingUser,
          isLoggedIn: true,
        });
      } else {
        // New login - create user data (in real app, this would come from API response)
        setUser({
          firstName: 'Benutzer', // In real app, this would come from API
          lastName: '',
          email: formData.email,
          isLoggedIn: true,
        });
      }

      // Trigger custom event to update header
      window.dispatchEvent(new Event('userUpdated'));

      // Redirect to account page after successful login
      router.push('/konto');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Anmelden</CardTitle>
            <CardDescription>
              Melden Sie sich mit Ihrem Konto an, um auf Ihre Bestellungen und persönlichen Daten zuzugreifen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showSuccessMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Registrierung erfolgreich! Bitte melden Sie sich jetzt an.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="ihre.email@beispiel.de"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Passwort *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {errors.submit && (
                <p className="text-sm text-red-500">{errors.submit}</p>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Anmeldung läuft...' : 'Anmelden'}
              </Button>

              <div className="text-center text-sm space-y-2">
                <Link 
                  href="/registrieren" 
                  className="text-primary hover:underline block"
                >
                  Noch kein Konto? Registrieren
                </Link>
                <Link 
                  href="/hilfe/faq" 
                  className="text-muted-foreground hover:underline block"
                >
                  Passwort vergessen?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


