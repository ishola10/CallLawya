import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_LAST_UPDATED, LegalDocument, type LegalSection } from "@/components/legal";
import { CONTACT_EMAILS, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use CallLawya's website and apps to find lawyers, book consultations and use Lex AI.",
  path: ROUTES.terms,
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    body: (
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your use of the CallLawya website, mobile apps and related
        services (together, the &quot;Platform&quot;). By creating an account or using the Platform, you agree to these
        Terms and to our <Link href={ROUTES.privacy}>Privacy Policy</Link>. If you do not agree, please do not use the
        Platform.
      </p>
    ),
  },
  {
    id: "about-calllawya",
    title: "What CallLawya does",
    body: (
      <>
        <p>
          CallLawya is a technology platform that helps users discover legal professionals, book consultations,
          communicate with lawyers and access legal-information tools.
        </p>
        <p>
          <strong>CallLawya is not a law firm and does not provide legal advice.</strong> Lawyers on the Platform are
          independent professionals who are responsible for the advice and services they provide. Any lawyer-client
          relationship is formed directly between you and the lawyer you choose.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Eligibility and accounts",
    body: (
      <ul>
        <li>You must be at least 18 years old and able to enter into a binding agreement to use the Platform.</li>
        <li>You must provide accurate, current and complete information and keep it up to date.</li>
        <li>
          You are responsible for keeping your login details confidential and for all activity on your account. Tell
          us immediately if you suspect unauthorised use.
        </li>
        <li>We may refuse, suspend or close accounts that breach these Terms.</li>
      </ul>
    ),
  },
  {
    id: "clients",
    title: "Using CallLawya as a client",
    body: (
      <ul>
        <li>Profiles, fees and availability are provided by lawyers. Review them carefully before booking.</li>
        <li>
          When you book a consultation, you agree to pay the fees shown and to follow the booking, rescheduling and
          cancellation rules displayed in the app.
        </li>
        <li>
          Give your lawyer accurate information. The quality of advice can depend on the facts you provide.
        </li>
        <li>
          CallLawya does not guarantee the outcome of any legal matter or the time it will take to resolve.
        </li>
      </ul>
    ),
  },
  {
    id: "lawyers",
    title: "Using CallLawya as a lawyer",
    body: (
      <ul>
        <li>
          You must be qualified and permitted to practise law, hold any required licences and keep them valid while
          using the Platform.
        </li>
        <li>You must complete our verification process. We may decline or remove profiles at our discretion.</li>
        <li>
          Your profile, fees and availability must be accurate and not misleading. You are responsible for the
          services and advice you provide.
        </li>
        <li>
          You must comply with the Rules of Professional Conduct for Legal Practitioners and all other professional,
          ethical and legal obligations, including client confidentiality and conflict checks.
        </li>
        <li>
          Platform fees, payout timing and any withdrawal charges are shown in the app and may change with notice.
        </li>
      </ul>
    ),
  },
  {
    id: "lex-ai",
    title: "Lex AI and document tools",
    body: (
      <>
        <p>
          Lex AI and our document-review tools provide general legal information to help you understand issues and
          prepare for conversations with lawyers. They do not provide legal advice and do not create a lawyer-client
          relationship.
        </p>
        <p>
          Responses may be incomplete, inaccurate or out of date and may not reflect the law that applies to your
          situation. Do not rely on them for legal decisions, high-value transactions, litigation or other matters
          with significant consequences. Consult a qualified lawyer instead.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments, fees and refunds",
    body: (
      <ul>
        <li>Fees are shown before you confirm a booking or pay an invoice.</li>
        <li>
          Payments are processed by our third-party payment provider. Your payment is also subject to their terms.
        </li>
        <li>
          Refunds, where available, are handled in line with the policy shown in the app at the time of booking.
        </li>
        <li>You are responsible for any taxes that apply to you.</li>
      </ul>
    ),
  },
  {
    id: "content",
    title: "Your content and reviews",
    body: (
      <>
        <p>
          You keep ownership of the content you submit, such as messages, documents and reviews. You give CallLawya a
          non-exclusive licence to host, store and display that content as needed to operate the Platform.
        </p>
        <p>
          Reviews must be honest and based on genuine experiences. We may remove content that breaches these Terms or
          the law.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>Use the Platform for anything unlawful, fraudulent or harmful.</li>
          <li>Impersonate anyone or misrepresent your qualifications or identity.</li>
          <li>Harass, threaten or abuse other users.</li>
          <li>Arrange to take payments for Platform bookings outside the Platform to avoid fees.</li>
          <li>Interfere with, scrape, reverse engineer or attempt to gain unauthorised access to the Platform.</li>
          <li>Upload malicious code or content that infringes other people&apos;s rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The Platform, including its software, design, text, graphics and trademarks, belongs to CallLawya or its
        licensors. You may use it only as permitted by these Terms.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: (
      <p>
        The Platform may use or link to third-party services, such as payment providers, app stores and sign-in
        providers. We are not responsible for third-party services, which are governed by their own terms.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the extent permitted by
        law, we do not guarantee that the Platform will be uninterrupted or error-free, or that any lawyer will be
        available or suitable for your needs.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, CallLawya is not liable for indirect or consequential losses, or for the advice
        or services provided by lawyers on the Platform. Nothing in these Terms limits liability that cannot be
        limited under applicable law.
      </p>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to compensate CallLawya for losses arising from your breach of these Terms or your misuse of the
        Platform, to the extent permitted by law.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: (
      <p>
        You can stop using the Platform and delete your account at any time. We may suspend or terminate access if you
        breach these Terms, if required by law or to protect other users. Sections that by their nature should continue
        after termination will continue to apply.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria. If a dispute arises, please contact us
        first so we can try to resolve it informally. Otherwise, disputes will be subject to the jurisdiction of the
        courts of Nigeria.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. We will post the updated version on this page with a new
        &quot;Last updated&quot; date and, where changes are significant, notify you. Continuing to use the Platform
        after changes take effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these Terms? Email <a href={`mailto:${CONTACT_EMAILS.support}`}>{CONTACT_EMAILS.support}</a> or
        use our <Link href={ROUTES.contact}>contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      current="terms"
      eyebrow="Legal"
      title="Terms of Use"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          Please read these terms carefully. They explain how CallLawya works, what you can expect from us and what we
          expect from you.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
