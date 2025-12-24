import Link from 'next/link';

export function Footer() {
  const legalLinks = [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/agb', label: 'AGB' },
    { href: '/hilfe/widerruf', label: 'Widerruf' },
  ];

  return (
    <footer className="border-t-2 bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-white">B-Ware Shop</h3>
            <p className="text-sm text-slate-300">
              Geprüfte Hausgeräte mit kleinen Makeln zu reduzierten Preisen.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Katalog</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/katalog/waschmaschinen" className="text-slate-300 hover:text-white transition-colors">
                  Waschmaschinen
                </Link>
              </li>
              <li>
                <Link href="/katalog/kuehlschraenke" className="text-slate-300 hover:text-white transition-colors">
                  Kühlschränke
                </Link>
              </li>
              <li>
                <Link href="/katalog/geschirrspueler" className="text-slate-300 hover:text-white transition-colors">
                  Geschirrspüler
                </Link>
              </li>
              <li>
                <Link href="/katalog/staubsauger" className="text-slate-300 hover:text-white transition-colors">
                  Staubsauger
                </Link>
              </li>
              <li>
                <Link href="/katalog/kaffeevollautomaten" className="text-slate-300 hover:text-white transition-colors">
                  Kaffeevollautomaten
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service/lieferung" className="text-slate-300 hover:text-white transition-colors">
                  Lieferung
                </Link>
              </li>
              <li>
                <Link href="/service/anschluss" className="text-slate-300 hover:text-white transition-colors">
                  Anschluss
                </Link>
              </li>
              <li>
                <Link href="/service/altgeraete" className="text-slate-300 hover:text-white transition-colors">
                  Altgeräte-Entsorgung
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t-2 border-slate-700 text-center text-sm text-slate-300">
          <p>&copy; {new Date().getFullYear()} B-Ware Shop. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}


