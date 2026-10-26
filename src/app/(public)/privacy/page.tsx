import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_LAST_UPDATED, LegalDocument, type LegalSection } from "@/components/legal";
import { CONTACT_EMAILS, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How CallLawya collects, uses, shares and protects personal data, and the rights you have under the Nigeria Data Protection Act 2023.",
  path: ROUTES.privacy,
});

const Email = () => <a href={`mailto:${CONTACT_EMAILS.support}`}>{CONTACT_EMAILS.support}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          CallLawya (&quot;CallLawya&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) operates a digital
          platform, available through this website and our mobile apps, that helps individuals and businesses
          discover legal professionals, book consultations and access legal-information tools such as Lex AI.
        </p>
        <p>
          This Privacy Policy explains how we handle personal data when you visit our website, use our apps or
          otherwise interact with us. We are the data controller for the personal data described in this policy and
          we process it in line with the Nigeria Data Protection Act 2023 (&quot;NDPA&quot;) and other applicable
          laws.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Account details:</strong> your name, email address, phone number, password and account type
            (client or lawyer).
          </li>
          <li>
            <strong>Profile information:</strong> for clients, details you choose to add to your profile; for lawyers,
            professional details such as your Supreme Court Number (SCN), licensing information, year and state of
            call, qualifications, areas of practice, location, consultation fees, availability and profile photo.
          </li>
          <li>
            <strong>Verification information (lawyers):</strong> information needed to confirm your identity and
            professional standing, which may include your National Identification Number (NIN) and a verification
            selfie.
          </li>
          <li>
            <strong>Payout details (lawyers):</strong> your bank name, account number and account name so we can pay
            you for completed work.
          </li>
          <li>
            <strong>Consultations and communications:</strong> bookings, messages, files and documents you share,
            records of calls and video sessions (such as time and duration), reviews and ratings, and messages you
            send to our support team.
          </li>
          <li>
            <strong>Lex AI and document tools:</strong> the questions, descriptions and documents you submit, and the
            responses generated.
          </li>
          <li>
            <strong>Referrals:</strong> referral codes you use or share and related reward information.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            Device and usage information such as device type, operating system, app version, IP address, push
            notification tokens and log data about how you use our services.
          </li>
        </ul>
        <h3>Information from third parties</h3>
        <ul>
          <li>
            If you sign in with Google or Apple, we receive basic account information such as your name and email
            address.
          </li>
          <li>Payment confirmations and transaction references from our payment provider.</li>
          <li>Results of professional verification checks, for example confirmation of a lawyer&apos;s SCN.</li>
        </ul>
        <p>
          Please only share information about other people, or sensitive details about your legal matter, where it is
          necessary for the help you are seeking.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    body: (
      <ul>
        <li>To create and manage your account and keep it secure.</li>
        <li>To verify lawyers before their profiles are activated, and to keep the directory accurate.</li>
        <li>To help you find lawyers, book consultations and communicate by call, video or chat.</li>
        <li>To process payments, invoices, refunds and lawyer payouts.</li>
        <li>To provide Lex AI and document-review features.</li>
        <li>To send service messages, booking updates and notifications.</li>
        <li>To provide customer support and respond to your enquiries.</li>
        <li>To prevent fraud and misuse, enforce our Terms and meet our legal obligations.</li>
        <li>To understand how our services are used and to improve them.</li>
      </ul>
    ),
  },
  {
    id: "lawful-bases",
    title: "Our lawful bases",
    body: (
      <>
        <p>Under the NDPA we rely on one or more of the following lawful bases to process personal data:</p>
        <ul>
          <li>
            <strong>Contract:</strong> where processing is needed to provide the services you request, such as
            bookings and payments.
          </li>
          <li>
            <strong>Consent:</strong> for example, where you choose to share optional information or enable
            notifications. You can withdraw consent at any time.
          </li>
          <li>
            <strong>Legal obligation:</strong> where we must keep or disclose information to comply with the law.
          </li>
          <li>
            <strong>Legitimate interests:</strong> such as keeping our platform secure and improving our services, where
            those interests are not overridden by your rights.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>We do not sell your personal data. We share it only where needed, including with:</p>
        <ul>
          <li>
            <strong>Clients and lawyers:</strong> the information needed for a consultation, such as booking details
            and the information you choose to share with the professional you book.
          </li>
          <li>
            <strong>Service providers:</strong> companies that help us operate the platform, such as cloud hosting,
            payment processing (Paystack), communications, push notifications and AI technology providers. They may
            only use your data to provide services to us.
          </li>
          <li>
            <strong>Verification sources:</strong> where needed to confirm a lawyer&apos;s identity or professional
            standing.
          </li>
          <li>
            <strong>Authorities and advisers:</strong> where required by law, court order or regulation, or to protect
            the rights, safety and property of our users, the public or CallLawya.
          </li>
          <li>
            <strong>Business transfers:</strong> if CallLawya is involved in a merger, acquisition or sale of assets,
            subject to appropriate safeguards.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "lex-ai",
    title: "Lex AI and automated tools",
    body: (
      <>
        <p>
          Lex AI and our document-review tools use artificial intelligence to generate general legal information. We
          process what you submit to produce responses, and we may use technology providers to do so.
        </p>
        <p>
          These tools do not make decisions that produce legal or similarly significant effects about you. Their
          responses may be incomplete or inaccurate and are not a substitute for advice from a qualified lawyer.
          Avoid submitting information that is not needed for your question.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Some of our service providers may store or process data outside Nigeria. Where personal data is transferred
        outside Nigeria, we take steps to ensure it receives an adequate level of protection as required by the NDPA,
        for example through contractual safeguards.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <p>
        We keep personal data only for as long as needed for the purposes described in this policy, including to
        provide our services, resolve disputes, keep accurate financial records and meet legal, regulatory and tax
        obligations. When information is no longer needed, we delete or anonymise it.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use technical and organisational measures designed to protect personal data against unauthorised access,
        loss or misuse. No method of transmission or storage is completely secure, so we cannot guarantee absolute
        security. Read more on our <Link href={ROUTES.security}>Security page</Link>.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Subject to the NDPA, you have the right to:</p>
        <ul>
          <li>Be informed about how your personal data is used.</li>
          <li>Access the personal data we hold about you.</li>
          <li>Ask us to correct inaccurate or incomplete data.</li>
          <li>Ask us to delete your data, where applicable.</li>
          <li>Restrict or object to certain processing.</li>
          <li>Receive your data in a portable format, where applicable.</li>
          <li>Withdraw consent where we rely on it.</li>
        </ul>
        <p>
          To exercise your rights, email <Email />. We may need to verify your identity first. You also have the right
          to lodge a complaint with the Nigeria Data Protection Commission (NDPC).
        </p>
      </>
    ),
  },
  {
    id: "deleting-your-account",
    title: "Deleting your account",
    body: (
      <p>
        You can permanently delete your account from within the CallLawya app or by contacting us at <Email />. When
        you delete your account we remove or anonymise your personal data, except information we must keep for legal,
        regulatory, accounting or dispute-resolution purposes.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        CallLawya is intended for people aged 18 and over. We do not knowingly collect personal data from children. If
        you believe a child has provided us with personal data, please contact us so we can remove it.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <p>
        Our website uses only the technologies needed for it to work, such as delivering pages securely and
        remembering basic preferences. We do not use advertising cookies. If we introduce analytics or other
        optional technologies, we will update this policy and, where required, ask for your consent.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. We will post the updated version on this page with a new
        &quot;Last updated&quot; date and, where changes are significant, let you know through the app or by email.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        If you have questions about this policy or how we handle your personal data, contact us at <Email /> or
        through our <Link href={ROUTES.contact}>contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      current="privacy"
      eyebrow="Legal"
      title="Privacy Policy"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          Your legal matters can involve sensitive information. This policy explains what we collect, why we collect
          it and the choices you have.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
