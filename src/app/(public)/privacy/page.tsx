import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/legal";
import { CONTACT_EMAILS, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How CallLawya Limited collects, uses, shares and protects personal information, and the privacy rights and choices available to you.",
  path: ROUTES.privacy,
});

const Email = () => <a href={`mailto:${CONTACT_EMAILS.support}`}>{CONTACT_EMAILS.support}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          This Privacy Policy explains how and why CallLawya collects, uses, and shares personal information when you
          interact with or use our Site or Service. It also includes any information CallLawya collects offline in
          connection with the Service, which we may combine with information from the Site and Service. By reading this
          Privacy Policy, you will understand your privacy rights and choices.
        </p>
        <p>
          When we say &quot;CallLawya&quot;, we mean CallLawya Limited and any of its affiliates. When we say
          &quot;Site&quot;, we mean <Link href={ROUTES.home}>www.calllawya.com</Link>, and when we say &quot;Service&quot;,
          we mean the Site plus any websites, features, applications, widgets, or online services owned or controlled by
          CallLawya and that post a link to this Privacy Policy.
        </p>
        <p>
          As part of the Service, CallLawya provides a marketplace which results in platform information pertaining to
          different parties to an interaction. Users of the Service may be Clients, Freelancers, Law firms, or Sites. This
          Privacy Policy applies to CallLawya&apos;s processing of personal information of Users where CallLawya
          determines the purposes and means of processing. It does not apply to processing of information by Users
          themselves, who may be controllers of the personal information they access through the Service. For
          information about how Users process your personal information, please contact them directly.
        </p>
        <p>
          By the use and entry into this site and submitting or requesting information, you are deemed to have
          understood and agreed to the terms of this policy, and you will be treated as having given your consent for
          information processing as provided in this policy.
        </p>
        <p>
          Please note that &quot;we&quot;, &quot;us&quot;, &quot;our&quot; and &quot;the Company&quot; refer to
          CALLLAWYA LIMITED, and &quot;your&quot; and &quot;you&quot; refer to the User.
        </p>
        <p>
          We encourage users of this site to comply with all regulatory and/or contractual obligations in respect of
          data privacy.
        </p>
        <p>
          Please be informed that this policy is subject to change, as determined by prevailing laws and other
          contingency factors. We therefore advise you to read the updated versions thoroughly and in their entirety
          before submitting any information.
        </p>
      </>
    ),
  },
  {
    id: "how-we-generate-data",
    title: "How we generate data",
    body: (
      <>
        <p>We generate data through the following means:</p>
        <ol>
          <li>
            <strong>Account creation and user profile:</strong> data that our users furnish us with during account
            creation. Some of the data collected includes names or initials, age, gender, weight, height, email and
            residential address, date of birth, mobile number, professional or employment-related information (e.g.
            professional title and credentials), username and password, financial information such as bank account,
            credit card or other payment instrument details, physical, physiological and mental health condition,
            medical records and history, and other health information that you provide during account registration or
            otherwise.
          </li>
          <li>
            <strong>User-generated content:</strong> we collect the information users provide or generate when they use
            our services or interact with our customer support. We also collect information through ratings, research,
            and survey responses. Please note that all survey responses are voluntary, and the information collected
            will be used for research and reporting purposes to help us better serve users. We achieve this by learning
            more about users&apos; needs and the quality of our services. We may share anonymous user data for research
            and analysis purposes. We also maintain records of our communications and meetings with you.
          </li>
          <li>
            <strong>Demographic data:</strong> we collect demographic data about users such as age, gender, employment
            status, and income through user surveys. This helps us determine whether our services are well received,
            the areas with larger subscription, and how we can improve our services.
          </li>
          <li>
            <strong>Location data:</strong> access to your location, only if you grant us access, which helps us attend
            to your legal cases.
          </li>
          <li>
            <strong>User patterns and preferences.</strong>
          </li>
        </ol>
        <p>We also collect additional information through:</p>
        <ul>
          <li>User assessments, such as ratings, complaints, or compliments.</li>
          <li>Data provided by users in connection with any legal rights, claim, proceedings, or dispute.</li>
          <li>Data available to the public.</li>
          <li>
            User data received from our business partners and affiliates through which users access our services.
            Examples include payment providers, other apps, and websites that use our APIs or whose APIs we use.
          </li>
        </ul>
        <p>We may merge the data collected from other sources with the data in our possession.</p>
      </>
    ),
  },
  {
    id: "how-we-use-personal-data",
    title: "How we use personal data",
    body: (
      <>
        <p>We use personal data:</p>
        <ul>
          <li>To provide information on services for your benefit;</li>
          <li>To manage your legal service requests;</li>
          <li>To arrange how you meet legal practitioners on our App while providing for your legal needs;</li>
          <li>To personalise your experiences with us;</li>
          <li>To improve our services;</li>
          <li>To comply with legal obligations; and</li>
          <li>
            To perform internal quality control, verify identity, send communications regarding service provision or
            any changes to the policy, prevent potentially prohibited or illegal activities, and enforce our{" "}
            <Link href={ROUTES.terms}>Terms and Conditions</Link>.
          </li>
        </ul>
        <p>Other uses may include:</p>
        <ul>
          <li>Generally managing your information;</li>
          <li>Responding to questions, comments and requests; and</li>
          <li>Providing access to certain areas and features of the Sites.</li>
        </ul>
        <p>
          Please note that in protecting the data of users, we do not exchange users&apos; personal data with third
          parties except where the prior consent of our users has been obtained.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "Data sharing",
    body: (
      <>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers, such as legal practitioners and partners who assist us in providing the services.</li>
          <li>
            Third parties for public health, research, analytics and any other legally permissible purposes, limited to
            impersonal (non-identifying) information within what was provided.
          </li>
          <li>
            Legal authorities, when required by law, for the purpose of responding to court orders and legal
            investigations, or in the legitimate interest of the Company to comply with regulatory laws.
          </li>
        </ul>
        <h3>Your choices and rights</h3>
        <ul>
          <li>
            We will share your personal information with third parties only in ways that are described in this Privacy
            Policy. We do not sell your personal information to third parties.
          </li>
          <li>
            We may collect information from other sources and combine it with information we collect about you under
            this Privacy Policy.
          </li>
          <li>
            We may also share data for marketing and communication purposes, provided that the prior consent of users
            has been obtained.
          </li>
          <li>
            Personal data may be viewed by the general public when users interact with us by posting reviews,
            information or complaints on our websites or social media handles.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data security",
    body: (
      <p>
        We take data security seriously and employ industry-standard measures to protect your information from
        unauthorised access, disclosure, alteration, or destruction. Read more on our{" "}
        <Link href={ROUTES.security}>Security page</Link>.
      </p>
    ),
  },
  {
    id: "decision-making",
    title: "Decision making",
    body: (
      <p>
        We reserve the right to deactivate users who have been observed and identified as engaging in fraudulent or
        other activities that are likely to negatively affect our brand name.
      </p>
    ),
  },
  {
    id: "cookies-and-tracking",
    title: "Cookies and tracking",
    body: (
      <p>
        We may use cookies, web beacons, pixels and other identity technologies, which you accept while using our App,
        and similar tracking technologies to enhance your experience on our App platform. You can manage your cookie
        preferences through your browser settings.
      </p>
    ),
  },
  {
    id: "other-cookies-and-tracking",
    title: "Other cookies and tracking",
    body: (
      <ul>
        <li>
          We may include third-party links which are outside our control. You are strongly advised to review the privacy
          policies of the third-party sites and Apps that you are directed to before continuing to use their services.
          Users hereby agree to exonerate us from any liability arising out of the use and practices of these third-party
          sites.
        </li>
        <li>
          We may also engage the services of other sites to advertise our services across the internet. These sites may
          use cookies, pixels, web beacons or any other technology to track and identify visitors to our websites and
          services.
        </li>
        <li>
          Note that they may use your personal information for other purposes disclosed to you at the time you provide
          personal information, or with your consent.
        </li>
      </ul>
    ),
  },
  {
    id: "updates",
    title: "Updates, alterations and modifications to this policy",
    body: (
      <ul>
        <li>
          We may update this Privacy Policy to reflect changes in our practices. We will notify you of any significant
          changes via email or our platform/App.
        </li>
        <li>
          Users will be given enough time to read through the changed policy and contact us with any questions or
          queries regarding the new Privacy Policy.
        </li>
        <li>By continuing to use the site and mobile application, you agree to be bound by the terms of the new policy.</li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Data protection rights of users",
    body: (
      <>
        <p>
          Just as we understand that privacy is important in this digital world, we also acknowledge the rights of our
          users regarding their data. To this end, users have the right to:
        </p>
        <ul>
          <li>Withdraw consent for their data to be processed;</li>
          <li>Erase and delete their data;</li>
          <li>Have their data transferred at their request; and</li>
          <li>Object to their data being processed.</li>
        </ul>
      </>
    ),
  },
  {
    id: "contact",
    title: "Questions on our Privacy Policy / Contact us",
    body: (
      <p>
        All questions, concerns, and complaints arising from this Privacy Policy should be sent to our email address at{" "}
        <Email />, or through our <Link href={ROUTES.contact}>contact page</Link>.
      </p>
    ),
  },
  {
    id: "consent",
    title: "Consent",
    body: (
      <>
        <p>By using our services, you consent to the terms of this Privacy Policy.</p>
        <p>
          Thank you for trusting CALLLAWYA LIMITED to provide for your legal needs. We are committed to safeguarding your
          privacy and providing you with the best possible experience.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      current="privacy"
      eyebrow="Legal"
      title="Privacy Policy for CallLawya Limited"
      updated="28 October 2026"
      intro={
        <p>
          How and why CallLawya collects, uses and shares personal information, and the privacy rights and choices
          available to you.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
