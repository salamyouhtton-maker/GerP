'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { discountReasons } from '@/data/discountReasons';
import { getUser, clearUser, getUserDisplayName, type UserData } from '@/lib/user';
import { getCartItemCount } from '@/lib/cart';

export function Header() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isBWareOpen, setIsBWareOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isHilfeOpen, setIsHilfeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUserState] = useState<UserData | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load user data on mount and listen for storage changes
  useEffect(() => {
    const loadUser = () => {
      setUserState(getUser());
    };

    // Load user on mount
    loadUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      loadUser();
    };

    // Listen for custom event (for same-tab updates)
    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Load cart item count on mount and listen for cart updates
  useEffect(() => {
    const loadCartCount = () => {
      setCartItemCount(getCartItemCount());
    };

    // Load cart count on mount
    loadCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    clearUser();
    setUserState(null);
    window.dispatchEvent(new Event('userUpdated'));
    // Optionally redirect to home page
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[hsl(var(--primary))]">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="bg-[hsl(var(--primary))] px-5 py-2.5 rounded-md border-2 border-white/20">
              <span className="text-white font-bold text-xl tracking-tight">B WARE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center flex-1 justify-center gap-0 mx-8">
            <div className="relative flex-1">
              <button
                onMouseEnter={() => setIsCatalogOpen(true)}
                onMouseLeave={() => setIsCatalogOpen(false)}
                className="w-full flex items-center justify-center gap-1 text-sm font-medium text-white hover:text-white/80 hover:bg-white/10 py-3 transition-colors"
              >
                Katalog
              </button>
              {isCatalogOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-4 shadow-lg z-50"
                  onMouseEnter={() => setIsCatalogOpen(true)}
                  onMouseLeave={() => setIsCatalogOpen(false)}
                >
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/katalog/${category.slug}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* B-Ware Menu */}
            <div className="relative flex-1">
              <button
                onMouseEnter={() => setIsBWareOpen(true)}
                onMouseLeave={() => setIsBWareOpen(false)}
                className="w-full flex items-center justify-center gap-1 text-sm font-medium text-white hover:text-white/80 hover:bg-white/10 py-3 transition-colors"
              >
                B-Ware
              </button>
              {isBWareOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-4 shadow-lg z-50"
                  onMouseEnter={() => setIsBWareOpen(true)}
                  onMouseLeave={() => setIsBWareOpen(false)}
                >
                  <div className="space-y-2">
                    <Link
                      href="/b-ware"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent font-semibold"
                    >
                      Warum günstiger?
                    </Link>
                    {discountReasons.map((reason) => (
                      <Link
                        key={reason.id}
                        href={`/b-ware/${reason.slug}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        {reason.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Service Menu */}
            <div className="relative flex-1">
              <button
                onMouseEnter={() => setIsServiceOpen(true)}
                onMouseLeave={() => setIsServiceOpen(false)}
                className="w-full flex items-center justify-center gap-1 text-sm font-medium text-white hover:text-white/80 hover:bg-white/10 py-3 transition-colors"
              >
                Service
              </button>
              {isServiceOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-4 shadow-lg z-50"
                  onMouseEnter={() => setIsServiceOpen(true)}
                  onMouseLeave={() => setIsServiceOpen(false)}
                >
                  <div className="space-y-2">
                    <Link
                      href="/service/lieferung"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Lieferung
                    </Link>
                    <Link
                      href="/service/anschluss"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Anschluss & Installation
                    </Link>
                    <Link
                      href="/service/altgeraete"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Altgeräte-Entsorgung
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* Hilfe Menu */}
            <div className="relative flex-1">
              <button
                onMouseEnter={() => setIsHilfeOpen(true)}
                onMouseLeave={() => setIsHilfeOpen(false)}
                className="w-full flex items-center justify-center gap-1 text-sm font-medium text-white hover:text-white/80 hover:bg-white/10 py-3 transition-colors"
              >
                Hilfe
              </button>
              {isHilfeOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-4 shadow-lg z-50"
                  onMouseEnter={() => setIsHilfeOpen(true)}
                  onMouseLeave={() => setIsHilfeOpen(false)}
                >
                  <div className="space-y-2">
                    <Link
                      href="/hilfe/faq"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/hilfe/widerruf"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Widerruf
                    </Link>
                    <Link
                      href="/hilfe/gewaehrleistung"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Gewährleistung
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href={user && user.isLoggedIn ? "/konto" : "/registrieren"}>
              <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {user && user.isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-white text-sm font-medium">
                  Hallo, {getUserDisplayName() || user.firstName}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            ) : (
              <Link href="/registrieren" className="hidden md:block">
                <Button size="sm" className="bg-white text-[hsl(var(--primary))] hover:bg-white/90">Registrieren</Button>
              </Link>
            )}
            <Link href="/warenkorb" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/20 md:hidden bg-[hsl(var(--primary))]">
            <nav className="flex flex-col gap-2 p-4">
              <div className="font-semibold text-white mb-1">Katalog</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/katalog/${category.slug}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <div className="font-semibold text-white mb-1 mt-4">B-Ware</div>
              <Link
                href="/b-ware"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Warum günstiger?
              </Link>
              {discountReasons.map((reason) => (
                <Link
                  key={reason.id}
                  href={`/b-ware/${reason.slug}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {reason.title}
                </Link>
              ))}
              
              <div className="font-semibold text-white mb-1 mt-4">Service</div>
              <Link
                href="/service/lieferung"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lieferung
              </Link>
              <Link
                href="/service/anschluss"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anschluss & Installation
              </Link>
              <Link
                href="/service/altgeraete"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Altgeräte-Entsorgung
              </Link>
              
              <div className="font-semibold text-white mb-1 mt-4">Hilfe</div>
              <Link
                href="/hilfe/faq"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/hilfe/widerruf"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Widerruf
              </Link>
              <Link
                href="/hilfe/gewaehrleistung"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gewährleistung
              </Link>
              
              <div className="border-t border-white/20 mt-4 pt-4">
                <Link
                  href={user && user.isLoggedIn ? "/konto" : "/registrieren"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Konto
                </Link>
                {user && user.isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-white">
                      Hallo, {getUserDisplayName() || user.firstName}
                    </div>
                    <button
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10 w-full text-left"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/anmelden"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Anmelden
                    </Link>
                    <Link
                      href="/registrieren"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Registrieren
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}



