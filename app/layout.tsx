import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderComponent from "@/components/shared/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ShoppingCart from "@/components/shared/ShoppingCart";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RedSeam Clothing",
  description: "RedSeam Clothing - Your Fashion Destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-poppins`}>
        <AuthProvider>
          <CartProvider>
            <HeaderComponent />
            {children}
            <ShoppingCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
