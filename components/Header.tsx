import Link from "next/link";
import React from "react";
import { Github } from "lucide-react";

function Header() {
  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-xl font-medium">Shortit</h1>
      <Link href="/">
        <Github />
      </Link>
    </nav>
  );
}

export default Header;
