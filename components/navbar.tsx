import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function Menu({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={`py-2 flex gap-1 hover:border-b-2 border-emerald-900 transition-all duration-75 ${
        pathname.match(`/${route}`) ? "border-b-2 font-bold" : ""
      }`}
      onClick={() => router.push(`/${route}`)}
    >
      {children}
    </div>
  );
}

const hideMenu = (pathname: string) => {
  if (
    pathname === "/" ||
    pathname === "/auth/login" ||
    pathname === "/auth/signup"
  )
    return true;
};

function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <div className="py-4 px-8 bg-emerald-600/60">
        <p className="font-bold">
          <Link href="/">BUBUGET</Link>
        </p>
      </div>
      <div
        className={`bg-emerald-600/20 flex justify-around cursor-pointer ${
          hideMenu(pathname) ? "hidden" : ""
        }`}
      >
        <Menu route="inputtransaction">
          <Image src="/input.svg" height={20} width={20} alt="input" />
          <p>Input</p>
        </Menu>
        <Menu route="dashboard">
          <Image src="/home.svg" height={20} width={20} alt="home" />
          <p>Main</p>
        </Menu>
        <Menu route="budget">
          <Image src="/budget.svg" width={23} height={25} alt="budget" />
          <p>Budget</p>
        </Menu>
      </div>
    </>
  );
}

export default Navbar;
