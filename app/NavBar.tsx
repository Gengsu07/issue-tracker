"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiBugThin } from "react-icons/pi";
import classNames from "classnames";

const NavBar = () => {
  const CurrenPath = usePathname();
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
            className={classNames({
              "text-zinc-900": CurrenPath === nav.href,
              "text-zinc-500": CurrenPath !== nav.href,
              "hover:text-zinc-900 transition-colors": true,
            })}
          >
            {nav.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
