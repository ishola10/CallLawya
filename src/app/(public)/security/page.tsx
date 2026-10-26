import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_LAST_UPDATED, LegalDocument, type LegalSection } from "@/components/legal";
import { CONTACT_EMAILS, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description:
    "How CallLawya protects accounts, conversations, documents and payments, and how to report a security concern.",
  path: ROUTES.security,
});

const SECTIONS: LegalSection[] = [
  {
    id: "our-approach",
    title: "Our approach",
    body: (
      <p>
        Legal matters can involve personal, financial or commercially sensitive information. We aim to make privacy
        and security an essential part of the CallLawya experience, and we keep improving our safeguards as the
        platform grows.
      </p>
    ),
  },
  {
    id: "account-protection",
    title: "Protecting your account",
    body: (
      <ul>
        <li>New accounts are confirmed with a one-time code sent to your email address.</li>
        <li>You can sign in with your email and password, or with Google or Apple.</li>
        <li>Password resets use a one-time code, so only someone with access to your email can reset your password.</li>
        <li>You can change your password at any time from the app.</li>
      </ul>
    ),
  },
  {
    id: "data-in-transit",
    title: "Connections to CallLawya",
    body: (
      <p>
        Our website and apps communicate with our servers over HTTPS, which encrypts information while it travels
        between your device and our services.
      </p>
    ),
  },
  {
    id: "lawyer-verification",
    title: "Lawyer verification",
    body: (
      <>
        <p>
          Before a lawyer&apos;s profile is activated, we check relevant professional identity and licensing
          information. This includes checking the lawyer&apos;s Supreme Court Number (SCN) and identity verification
          steps such as a verification selfie.
        </p>
        <p>
          Verification helps build trust, but it does not guarantee the quality or outcome of any legal service. Review
          lawyer profiles and ask questions before you proceed.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Payments are processed by Paystack, a PCI DSS-certified payment provider. CallLawya does not store your full
        card details.
      </p>
    ),
  },
  {
    id: "your-data",
    title: "Access to your data",
    body: (
      <>
        <p>
          We work to limit access to personal data to people and service providers who need it to operate and support
          the platform. Read our <Link href={ROUTES.privacy}>Privacy Policy</Link> to learn what we collect and how we
          use it.
        </p>
        <p>You can permanently delete your account from within the CallLawya app at any time.</p>
      </>
    ),
  },
  {
    id: "staying-safe",
    title: "How you can stay safe",
    body: (
      <ul>
        <li>Use a strong, unique password and never share your login code with anyone.</li>
        <li>CallLawya will never ask for your password or one-time code by phone, chat or email.</li>
        <li>Keep payments and bookings on the platform rather than paying lawyers you met on CallLawya directly.</li>
        <li>Only share the documents and details needed for your consultation.</li>
        <li>Keep your app and phone software up to date.</li>
      </ul>
    ),
  },
  {
    id: "report-a-concern",
    title: "Report a security concern",
    body: (
      <p>
        If you think your account has been compromised or you have found a security vulnerability, email{" "}
        <a href={`mailto:${CONTACT_EMAILS.support}?subject=Security%20concern`}>{CONTACT_EMAILS.support}</a> with the
        subject &quot;Security concern&quot;. Please include as much detail as you can and give us a reasonable
        opportunity to investigate before sharing information about a vulnerability publicly.
      </p>
    ),
  },
  {
    id: "incidents",
    title: "If something goes wrong",
    body: (
      <p>
        If we become aware of a personal data breach, we will investigate, take steps to contain it and notify affected
        users and the Nigeria Data Protection Commission where required by law.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalDocument
      current="security"
      eyebrow="Legal"
      title="Security at CallLawya"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          How we help protect your account, your conversations and your payments, and what you can do to stay safe.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
