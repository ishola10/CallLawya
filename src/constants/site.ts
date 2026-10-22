import { FacebookIcon, InstagramIcon, LinkedinIcon, XTwitterIcon } from "@/assets/icons";

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
  googlePlay: "https://play.google.com/store/apps/details?id=com.vickzuzo.lawyerapp",
  appStore: "https://apps.apple.com/gb/app/calllawya/id6757891453",
} as const;

export const MOBILE_APP = {
  scheme: "calllawya",
  androidPackage: "com.vickzuzo.lawyerapp",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: LinkedinIcon, href: "#" },
  { label: "X (Twitter)", icon: XTwitterIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "Facebook", icon: FacebookIcon, href: "#" },
] as const;
