import { FacebookIcon, InstagramIcon, LinkedinIcon, XTwitterIcon } from "@/assets/icons";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Lawyers Directory", href: "/lawyers" },
  { label: "Join as a Lawyer", href: "/join-as-a-lawyer" },
  { label: "News", href: "/news" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const ROUTES = {
  home: "/",
  features: "/features",
  howItWorks: "/how-it-works",
  joinAsLawyer: "/join-as-a-lawyer",
  lawyers: "/lawyers",
  news: "/news",
  about: "/about",
  contact: "/contact",
  download: "/download",
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
  support: "/support",
  articles: "/articles",
  writeArticle: "/articles/new",
} as const;

export const SUPPORT_PHONE = {
  display: "+234 (0) 706 801 8386",
  href: "tel:+2347068018386",
  hours: "Mon–Fri, 9am–5pm WAT",
} as const;

export const CONTACT_EMAILS = {
  support: "support@calllawya.com",
  lawyers: "legal@calllawya.com",
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
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/posts/calllawya_calllawya-accesstolegalservices-lawyersinnigeria-activity-7434582787774382080-Nfao",
  },
  { label: "X (Twitter)", icon: XTwitterIcon, href: "https://x.com/i/status/2030304431779021035" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/p/DVbES6pDIOJ/?igsh=MXNrZ2Fhdnc0dnBobw==" },
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/share/p/1bdmDsv3Lv/" },
] as const;
