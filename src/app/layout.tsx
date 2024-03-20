import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/nav";
import Offer from "./_components/offer";
import { SessionProivder } from "./_components/sessionContext";
import { validateRequest } from "~/lib/auth/validate-request";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ezcommerce",
  description: "shopping should be ezee!!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-screen`}>
        <TRPCReactProvider>
          <SessionProivder value={session}>
            <Nav />
            <Offer />
            {children}
          </SessionProivder>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
