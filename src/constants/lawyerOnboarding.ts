import {
  CalendarCheckIcon,
  CalendarClockIcon,
  ChartLineIcon,
  SearchIcon,
  UserRoundCheckIcon,
  WalletIcon,
} from "@/assets/icons";
import { ROUTES } from "./site";

/** Every "Join as a Lawyer" button leads to the step-by-step onboarding page. */
export const LAWYER_SIGNUP_HREF = ROUTES.joinAsLawyer;

export const LAWYER_PRICING_NOTE =
  "Free to join. No monthly listing fees. A 10% platform commission applies to eligible transactions.";

export const LAWYER_ONBOARDING_STEPS = [
  {
    title: "Register and Get Verified",
    text: "Create your account and provide your Supreme Court of Nigeria enrolment number, identity details and required professional information. We review the submitted information before approving your profile to accept bookings.",
  },
  {
    title: "Set Up Your Practice",
    text: "Build your professional profile, select your areas of specialisation, set your consultation fees and choose the dates and times you are available. Add your payout details and connect your calendar where supported.",
  },
  {
    title: "Start Receiving Bookings",
    text: "Once your profile is approved and published, potential clients can discover your services and book available consultations. Manage your appointments, track completed consultations and monitor your earnings through the platform.",
  },
];

export const LAWYER_BENEFITS = [
  {
    icon: SearchIcon,
    title: "Reach Potential Clients",
    text: "Help people searching for legal services discover your profile based on your areas of practice and other relevant criteria.",
  },
  {
    icon: WalletIcon,
    title: "Set Your Own Fees",
    text: "You decide what to charge for your consultations. Publish your fees so potential clients can review the price before booking.",
  },
  {
    icon: CalendarClockIcon,
    title: "Manage Your Availability",
    text: "Set your working hours, choose available appointment slots and block out dates when you are unavailable.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Manage Consultations in One Place",
    text: "Keep track of appointments, review booking details and organise your consultation schedule through your CallLawya account.",
  },
  {
    icon: UserRoundCheckIcon,
    title: "Build a Verified Professional Profile",
    text: "Showcase your qualifications, experience and areas of specialisation through a professional profile that helps clients make informed choices.",
  },
  {
    icon: ChartLineIcon,
    title: "Track Your Earnings",
    text: "Review transaction records, platform commissions and eligible payouts through your account.",
  },
];

export const LAWYER_FAQS = [
  {
    question: "Who can join CallLawya?",
    answer:
      "Legal professionals who meet CallLawya's eligibility and verification requirements can apply to join the platform.",
  },
  {
    question: "Is it free to register?",
    answer:
      "Yes. Registration and listing are free, with no monthly listing fee. A 10% platform commission applies to eligible transactions processed through CallLawya.",
  },
  {
    question: "How does lawyer verification work?",
    answer:
      "You provide your Supreme Court of Nigeria enrolment number, identity details and the required professional information. Your profile must pass the applicable verification checks before it can accept bookings.",
  },
  {
    question: "Can I set my own consultation fees?",
    answer:
      "Yes. You can set your consultation fees and publish them on your profile, subject to CallLawya's applicable platform rules.",
  },
  {
    question: "Can I choose when I am available?",
    answer:
      "Yes. You can configure your working hours and appointment availability, and block dates when you are unavailable.",
  },
  {
    question: "How do I receive payments?",
    answer:
      "Add and verify your payout account and review the applicable payment terms. Eligible earnings are processed according to CallLawya's payment and payout arrangements.",
  },
  {
    question: "How does the 10% commission work?",
    answer:
      "CallLawya charges a 10% platform commission on eligible payments processed through the platform. Your account should show the relevant transaction details and applicable deductions.",
  },
  {
    question: "Can I connect my calendar?",
    answer:
      "Where supported, you can connect a compatible calendar or add confirmed appointments to help manage your schedule.",
  },
  {
    question: "Does joining guarantee clients?",
    answer:
      "No. CallLawya provides a platform for discovery and connection, but the number of enquiries and bookings depends on client demand, profile suitability, availability and other factors.",
  },
];
