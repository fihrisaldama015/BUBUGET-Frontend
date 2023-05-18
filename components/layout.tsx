import Navbar from "@/components/navbar";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"], weight: "variable" });
export const metadata = {
  title: "Bubuget",
  description: "Budgeting & Managing Money for College Student",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${open_sans.className} flex min-h-screen flex-col bg-[#D0E5E0]`}
    >
      <Navbar />
      <div className="relative h-full flex-grow bg-[#D0E5E0]">{children}</div>
    </div>
  );
}

export default Layout;
