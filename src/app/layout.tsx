import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBar } from "@/components/layout/TrustBar";
import { NewProductNotification } from "@/components/notifications/NewProductNotification";
import { OrderStatusUpdater } from "@/components/orders/OrderStatusUpdater";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B-Ware Shop - Geprüfte Hausgeräte mit kleinen Makeln",
  description: "Kaufen Sie geprüfte Hausgeräte mit kleinen Makeln zu reduzierten Preisen. Transparente Defektangaben und gesetzliche Gewährleistung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <TrustBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <NewProductNotification />
        <OrderStatusUpdater />
      </body>
    </html>
  );
}


