import type { Metadata } from "next";
import { League_Spartan, Lalezar } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-leagueSpartan",
});
const lalezar = Lalezar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lalezar",
});

export const metadata: Metadata = {
  title: "SparcHub",
  description: "The offical UNSW home for societies reviews and insights.",
  icons: {
    icon: "/assets/tempIcon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} ${lalezar.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
