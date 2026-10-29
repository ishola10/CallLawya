"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logo } from "@/assets/images";
import { NAV_LINKS, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import { DownloadIcon, MenuIcon, XIcon } from "@/assets/icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black text-white">
      <div className="page-x flex h-[72px] items-center gap-4 xl:gap-8 lg:h-[86px]">
        <Link href={ROUTES.home} className="shrink-0" onClick={closeMenu}>
          <Image src={logo} alt="CallLawya" className="h-auto w-[104px] lg:w-[118px]" preload />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 text-sm font-semibold xl:flex 2xl:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap transition-colors hover:text-brand-light",
                pathname === link.href && "text-brand-light",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 whitespace-nowrap xl:flex">
          <Link
            href={ROUTES.lawyers}
            className="press rounded-full bg-brand px-5 py-3 text-sm font-bold hover:bg-brand-hover"
          >
            Find a Lawyer
          </Link>
          <Link
            href={ROUTES.download}
            aria-label="Download app"
            className={cn(
              "press flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:border-brand",
              pathname === ROUTES.download && "border-brand text-brand-light",
            )}
          >
            <Icon icon={DownloadIcon} />
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg xl:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon icon={menuOpen ? XIcon : MenuIcon} />
        </button>
      </div>

      {menuOpen && (
        <div className="page-x border-t border-white/15 pb-6 xl:hidden">
          <nav className="flex flex-col py-2 text-base font-semibold">
            {[...NAV_LINKS, { label: "Download the App", href: ROUTES.download }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "border-b border-white/10 py-4",
                  pathname === link.href && "text-brand-light",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={ROUTES.lawyers}
            onClick={closeMenu}
            className="mt-4 block rounded-full bg-brand px-4 py-3 text-center text-sm font-bold"
          >
            Find a Lawyer
          </Link>
        </div>
      )}
    </header>
  );
}
