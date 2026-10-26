import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets/images";
import { ROUTES, SOCIAL_LINKS, STORE_LINKS } from "@/constants";
import Icon from "./Icon";

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Find a Lawyer", href: ROUTES.lawyers },
      { label: "For Lawyers", href: ROUTES.forLawyers },
      { label: "How It Works", href: ROUTES.howItWorks },
      { label: "Features", href: ROUTES.features },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      // { label: "News", href: ROUTES.news },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: ROUTES.privacy },
      { label: "Terms", href: ROUTES.terms },
      { label: "Security", href: ROUTES.security },
    ],
  },
  {
    title: "Download",
    links: [
      { label: "Android", href: STORE_LINKS.googlePlay },
      { label: "iOS", href: STORE_LINKS.appStore },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="page-x bg-black pb-8 pt-12 text-white">
      <div className="grid gap-10 border-b border-white/20 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image src={logo} alt="CallLawya" className="h-auto w-[145px]" />
          <p className="mt-5 max-w-xs text-white/50">
            Democratising Africa&apos;s legal system. Justice should not be a privilege.
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/40">Follow our social media pages</p>
          <div className="mt-3 flex gap-4 text-xl">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`CallLawya on ${social.label}`}
                className="hover:text-brand-light"
              >
                <Icon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h4 className="mb-4 font-bold">{column.title}</h4>
            {column.links.map((link) => (
              <Link key={link.label} href={link.href} className="mb-2 block text-white/55 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-7 text-sm text-white/45 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} CallLawya. Democratizing Legal Access in Africa.</span>
        <span>Built for Africa. Available anywhere.</span>
      </div>
    </footer>
  );
}
