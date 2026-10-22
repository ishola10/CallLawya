import { faFacebook, faInstagram, faLinkedin, faXTwitter } from "@/assets/icons";

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Lawyers Directory", href: "/lawyers" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const ROUTES = {
  home: "/",
  features: "/features",
  howItWorks: "/how-it-works",
  forLawyers: "/how-it-works#for-lawyers",
  lawyers: "/lawyers",
  news: "/news",
  about: "/about",
  contact: "/contact",
  download: "/download",
} as const;

export const CONTACT_EMAILS = {
  support: "support@calllawya.com",
  lawyers: "lawyers@calllawya.com",
  press: "press@calllawya.com",
} as const;

export const STORE_LINKS = {
  googlePlay: "#",
  appStore: "#",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: faLinkedin, href: "#" },
  { label: "X (Twitter)", icon: faXTwitter, href: "#" },
  { label: "Instagram", icon: faInstagram, href: "#" },
  { label: "Facebook", icon: faFacebook, href: "#" },
] as const;
