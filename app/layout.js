import React from 'react';
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WIshlistContext";
import { Analytics } from '@vercel/analytics/react';
import Topheader from '../components/Topheader';
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {AuthProvider} from "../components/Provider";
import { Quicksand, Fraunces } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});
export const metadata = {
  title: "Skill Match",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en" className={`${quicksand.variable} ${fraunces.variable}`}>
      {/* <head>
      </head> */}
      <body
          suppressHydrationWarning={true}
          className="flex flex-col min-h-screen w-full background-image"
        >
      <AuthProvider>
      <Toaster/>
      <Topheader/>
      <CartProvider>
      <WishlistProvider>
      <Navbar />
        {children}
        <Analytics />
        </WishlistProvider>
        </CartProvider>
        <Footer/>
        </AuthProvider>
      </body>
    </html>
    {/* <Script src="https://checkout.razorpay.com/v1/checkout.js"
          /> */}
    </>
  );
}