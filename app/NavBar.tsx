"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiBugThin } from "react-icons/pi";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const CurrenPath = usePathname();
  const { status, data: session } = useSession();
  const navList = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <nav className="flex space-x-6 mb-5 px-5 border-b h-14 items-center shadow-md bg-biru-djp">
      <Link href={"/"}>
        <PiBugThin size={50} color="white" />
      </Link>
      <ul className="flex space-x-6">
        {navList.map((nav) => (
          <li>
            <Link
              key={nav.href}
              href={nav.href}
              className={classNames({
                "text-kuning-djp font-bold": CurrenPath === nav.href,
                "text-white": CurrenPath !== nav.href,
                "hover:text-kuning-djp hover:font-bold transition-colors ":
                  true,
              })}
            >
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box className="text-white">
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
