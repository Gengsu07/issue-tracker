import Link from "next/link";
import React from "react";
import { PiBugThin } from "react-icons/pi";

const NavBar = () => {
  const navList = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 mb-5 px-5 border-b h-14 items-center">
      <Link href={"/"}>
        <PiBugThin size={50} color="zinc" />
      </Link>
      <ul className="flex space-x-6">
        {navList.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className=" text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {nav.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
