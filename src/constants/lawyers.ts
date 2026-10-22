import type { StaticImageData } from "next/image";
import {
  lawyerMan1,
  lawyerMan2,
  lawyerWoman1,
  lawyerWoman2,
} from "@/assets/images";

export type Availability = "now" | "week";

export type Lawyer = {
  id: string;
  name: string;
  specialization: string;
  city: string;
  country: string;
  flag: string;
  rating: number;
  price: number;
  experience: number;
  languages: string[];
  availability: Availability;
  image: StaticImageData;
  imagePosition?: "center" | "top";
};

export const SPECIALIZATIONS = [
  "Property Law",
  "Family Law",
  "Business Law",
  "Criminal Law",
  "Intellectual Property",
  "Employment Law",
] as const;

export const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "South Africa"] as const;

export const LANGUAGES = ["English", "French", "Swahili"] as const;

export const LAWYERS: Lawyer[] = [
  {
    id: "amara-okoye",
    name: "Amara Okoye",
    specialization: "Property Law",
    city: "Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    rating: 4.9,
    price: 30,
    experience: 9,
    languages: ["English", "Igbo"],
    availability: "now",
    image: lawyerWoman1,
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    specialization: "Business Law",
    city: "Accra",
    country: "Ghana",
    flag: "🇬🇭",
    rating: 4.8,
    price: 35,
    experience: 12,
    languages: ["English", "Twi"],
    availability: "week",
    image: lawyerMan1,
  },
  {
    id: "nandi-mbeki",
    name: "Nandi Mbeki",
    specialization: "Family Law",
    city: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    rating: 5.0,
    price: 42,
    experience: 11,
    languages: ["English", "Zulu"],
    availability: "now",
    image: lawyerWoman2,
  },
  {
    id: "david-kamau",
    name: "David Kamau",
    specialization: "Criminal Law",
    city: "Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    rating: 4.9,
    price: 28,
    experience: 8,
    languages: ["English", "Swahili"],
    availability: "now",
    image: lawyerMan2,
  },
  {
    id: "zainab-bello",
    name: "Zainab Bello",
    specialization: "Intellectual Property",
    city: "Abuja",
    country: "Nigeria",
    flag: "🇳🇬",
    rating: 4.7,
    price: 32,
    experience: 7,
    languages: ["English", "Hausa", "French"],
    availability: "week",
    image: lawyerWoman1,
    imagePosition: "top",
  },
  {
    id: "tunde-afolabi",
    name: "Tunde Afolabi",
    specialization: "Employment Law",
    city: "Ibadan",
    country: "Nigeria",
    flag: "🇳🇬",
    rating: 4.8,
    price: 25,
    experience: 10,
    languages: ["English", "Yoruba"],
    availability: "now",
    image: lawyerMan1,
    imagePosition: "top",
  },
];

export const FEATURED_LAWYERS = LAWYERS.slice(0, 4);
