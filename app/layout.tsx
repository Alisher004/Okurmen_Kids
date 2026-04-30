import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

export const metadata: Metadata = {
  title: "Okurmen Kids - Балдар үчүн IT курстар",
  description: "Бишкектеги балдар үчүн IT академиясы. Frontend, Scratch, Python курстары.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ky">
      <body className="antialiased bg-white">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}