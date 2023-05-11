import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="py-4 px-8 bg-emerald-600/60">
      <p className="font-bold">
        <Link href="/">BUBUGET</Link>
      </p>
    </div>
  );
}

export default Navbar;
