import Navbar from "@/components/navbar";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"], weight: "variable" });
export const metadata = {
  title: "Bubuget",
  description: "Budgeting & Managing Money for College Student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${open_sans.className} flex h-screen flex-col bg-[#D0E5E0]`}
      >
        <Navbar />
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
