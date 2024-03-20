import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/nav";
import Offer from "./_components/offer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ezcommerce",
  description: "shopping should be ezee!!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-screen`}>
        <TRPCReactProvider>
          <Nav />
          <Offer />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
