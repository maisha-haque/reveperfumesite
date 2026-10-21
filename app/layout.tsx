import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header.jsx";
import Footer from "./(components)/Footer.jsx";
import CartDrawer from "./(components)/CartDrawer.jsx";
import WishlistDrawer from "./(components)/WishlistDrawer.jsx";
import { ShopProvider } from "./context/ShopContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rêve Parfums — Haute Parfumerie",
  description: "Explore our complete repertoire of timeless elixirs formulated with rare botanical extracts, precious resins, and pure essences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#151E25] text-white">
        <ShopProvider>
          <Header />
          <CartDrawer />
          <WishlistDrawer />
          <main className="flex-1">{children}</main>
        </ShopProvider>
        <Footer />
      </body>
    </html>
  );
}
