import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Okurmen Kids - Балдар үчүн IT курстар",
  description: "Бишкектеги балдар үчүн IT академиясы. Frontend, Scratch, Python курстары.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ky" className={jakarta.variable}>
      <body className={`${jakarta.className} text-brand-navy-700`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
