import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/legal";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "The Terms and Conditions that govern your use of the CallLawya platform, including services for users, clients and legal practitioners in Nigeria.",
  path: ROUTES.terms,
});

const NOTICE_EMAIL = "info@calllawya.com";

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Welcome to CallLawya. These Terms and Conditions (&quot;Terms&quot;) govern your use of our platform, including
          all services provided to users, clients, and legal practitioners within the Federal Republic of Nigeria. By
          accessing or using the app, you agree to comply with and be bound by these Terms.
        </p>
        <h3>Language disclaimer</h3>
        <p>
          This policy is being made available in multiple languages for convenience. In the event of any discrepancy or
          conflict between the translated versions and the English version, the English version shall be deemed the
          official and controlling policy.
        </p>
      </>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance of terms; right of suspension and/or termination",
    body: (
      <p>
        PLEASE READ THESE TERMS CAREFULLY. THESE TERMS GOVERN THE USE OF OUR SERVICES AND APPLY TO ALL USERS VISITING OR
        ACCESSING THE SERVICES BY ANY MEANS. BY ACCESSING OR USING THE SERVICES IN ANY WAY, COMPLETING THE ACCOUNT
        REGISTRATION PROCESS, BROWSING OR DOWNLOADING THE SERVICES, YOU REPRESENT THAT: (1) YOU HAVE READ, UNDERSTAND,
        AND AGREE TO BE BOUND BY THESE TERMS, (2) YOU ARE OF LEGAL AGE TO FORM A BINDING CONTRACT WITH THE COMPANY, (3)
        YOU ARE NOT BARRED FROM USING THE SERVICES UNDER THE LAWS OF NIGERIA, YOUR LOCATION OR ANY OTHER APPLICABLE
        JURISDICTION; AND (4) YOU HAVE THE AUTHORITY TO ACCEPT THESE TERMS. IF YOU DO NOT AGREE TO BE BOUND BY THESE
        TERMS, YOU MAY NOT ACCESS OR USE THE SERVICES.
      </p>
    ),
  },
  {
    id: "definitions",
    title: "Definitions",
    body: (
      <ul>
        <li>
          <strong>&quot;App&quot;</strong> refers to CallLawya Ltd.
        </li>
        <li>
          <strong>&quot;User&quot;</strong> refers to any individual using the app for legal information or assistance.
        </li>
        <li>
          <strong>&quot;Client&quot;</strong> refers to individuals or entities seeking legal representation or advice.
        </li>
        <li>
          <strong>&quot;Legal Practitioner&quot;</strong> refers to lawyers duly qualified and called to the Nigerian Bar
          under the Legal Practitioners Act.
        </li>
      </ul>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <p>
        You must be at least 18 years old and capable of entering into legally binding agreements under Nigerian law.
      </p>
    ),
  },
  {
    id: "nature-of-services",
    title: "Nature of services",
    body: (
      <p>
        The app serves as a digital platform connecting users and clients with licensed legal practitioners in Nigeria.
        The app does not provide legal advice and does not create a solicitor-client relationship between the app and
        users.
      </p>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User responsibilities",
    body: (
      <ul>
        <li>Provide accurate, current, and complete information.</li>
        <li>Use the platform strictly for lawful purposes.</li>
        <li>Refrain from posting false, misleading, or harmful content.</li>
      </ul>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Client responsibilities",
    body: (
      <ul>
        <li>Understand that engaging a legal practitioner creates a separate contractual relationship.</li>
        <li>Ensure full disclosure of relevant facts to legal practitioners.</li>
      </ul>
    ),
  },
  {
    id: "legal-practitioner-responsibilities",
    title: "Legal practitioner responsibilities",
    body: (
      <ul>
        <li>Must be duly enrolled with the Supreme Court of Nigeria.</li>
        <li>Must comply with the Rules of Professional Conduct.</li>
        <li>Must not engage in misleading advertising or unethical conduct.</li>
      </ul>
    ),
  },
  {
    id: "payments-and-fees",
    title: "Payments and fees",
    body: (
      <ul>
        <li>Fees for legal services and consultation fees shall be agreed between clients and legal practitioners.</li>
        <li>The app may charge a service, access or facilitation fee and VAT.</li>
        <li>Refund policies shall be stated clearly where applicable.</li>
      </ul>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality and privilege",
    body: (
      <ul>
        <li>
          Communications between clients and legal practitioners may be protected under legal professional privilege.
        </li>
        <li>The app will take reasonable steps to protect user data but does not guarantee absolute security.</li>
      </ul>
    ),
  },
  {
    id: "data-protection",
    title: "Data protection (NDPR/NDPA compliance)",
    body: (
      <>
        <p>
          We are committed to protecting your personal data in compliance with the Nigeria Data Protection Regulation
          (NDPR) and the Nigeria Data Protection Act (NDPA).
        </p>
        <ul>
          <li>
            <strong>Lawful basis:</strong> we process personal data based on consent, contractual necessity, legal
            obligation, or legitimate interest.
          </li>
          <li>
            <strong>Data collection:</strong> we collect only necessary personal data, including identity information,
            contact details, and legal case information.
          </li>
          <li>
            <strong>Data usage:</strong> your data is used solely for providing services, improving the platform, and
            complying with legal obligations.
          </li>
          <li>
            <strong>Data retention:</strong> personal data shall not be retained longer than necessary for the purposes
            for which it was collected.
          </li>
          <li>
            <strong>User rights:</strong> you have the right to access, correct, delete, or restrict processing of your
            personal data.
          </li>
          <li>
            <strong>Data security:</strong> we implement appropriate technical and organisational measures to protect
            your data.
          </li>
          <li>
            <strong>Third-party sharing:</strong> data may be shared with legal practitioners or regulatory authorities
            where required.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "aml",
    title: "Anti-money laundering (AML) and compliance",
    body: (
      <>
        <p>To comply with applicable anti-money laundering laws and regulations in Nigeria:</p>
        <ul>
          <li>Users and clients may be required to complete identity verification (KYC).</li>
          <li>Suspicious transactions or activities may be reported to relevant authorities.</li>
          <li>The app reserves the right to refuse or terminate services where AML concerns arise.</li>
          <li>Legal practitioners must comply with all applicable AML obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "account-security",
    title: "Account creation and security",
    body: (
      <>
        <p>
          If you create an account on any of our platforms, you are responsible for maintaining the confidentiality and
          security of your account credentials, including your username and password. You must not share your login
          details, network links, or access credentials with any third party without the Company&apos;s prior written
          consent.
        </p>
        <p>
          You accept full responsibility for all activities carried out under your account, including any accounts you
          establish or manage on behalf of authorised users. You will be solely liable for any loss, damage, or expense
          suffered by you, the Company, or any third party arising from providing false, inaccurate, outdated, or
          incomplete information, failing to promptly update your information, or any breach of your obligations under
          this section.
        </p>
        <p>
          Where you act as an organisation, you are solely responsible for the quality, integrity, legality, and
          suitability of any customer data you provide or control, and for obtaining all necessary third-party consents
          relating to that data.
        </p>
        <p>
          If an organisation or other entity creates or administers accounts for multiple authorised users, it is
          responsible for ensuring that those users comply with these Terms. The organisation must not permit access to
          or use of the Services for any unauthorised purpose, in breach of these Terms, or by anyone other than
          authorised users.
        </p>
        <p>
          The organisation must keep all user identifications, registration numbers, passwords, and similar access
          credentials strictly confidential and must not disclose them to any third party.
        </p>
        <p>
          You must immediately notify the Company of any unauthorised use of your account or any other security breach.
          The Company reserves the right, at its sole discretion, to refuse service, suspend or terminate accounts,
          remove or modify content, or cancel Services.
        </p>
        <p>
          You may maintain only one (1) account and must not create an account on behalf of any other individual,
          except as expressly permitted under Article 5. Your account is personal to you and must not be shared with or
          used by any other person.
        </p>
      </>
    ),
  },
  {
    id: "authorised-representatives",
    title: "Authorised representatives",
    body: (
      <>
        <p>
          The Company may, at its sole discretion, permit you to appoint another individual or legal entity (an
          &quot;Authorised Representative&quot;) to act as your agent in your dealings with the Company, in accordance
          with procedures prescribed by the Company. Such Authorised Representative may be empowered to create, access,
          and administer your account, submit and process orders for products and Services, carry out related
          transactions, and exchange documents and information with the Company on your behalf, including confidential
          information, personal data, and any relevant records or results.
        </p>
        <p>
          By appointing an Authorised Representative in accordance with the Company&apos;s prescribed procedures, you
          authorise the Company to recognise and deal with that Authorised Representative as your duly authorised agent
          for all purposes, unless and until such appointment is validly terminated. You acknowledge and agree that your
          Authorised Representative may accept and agree, on your behalf, to all applicable agreements, policies, and
          terms of the Company (including these Terms), as amended from time to time.
        </p>
        <p>
          You further agree that you shall be fully responsible and liable for all acts, omissions, and conduct of your
          Authorised Representative, including any misuse of your account, confidential information, or personal data,
          whether authorised or unauthorised.
        </p>
        <p>
          You or your Authorised Representative may terminate the appointment at any time by following the procedures
          prescribed by the Company or by contacting Customer Support. Any such termination shall only take effect once
          it has been received and processed by the Company.
        </p>
        <p>
          The Company reserves the right, at its sole discretion, to revoke or terminate the status of any Authorised
          Representative at any time, with or without prior notice. Upon termination, you shall retain sole control of
          your account, and the Company shall no longer accept any instructions, requests, or transactions from the
          former Authorised Representative on your behalf.
        </p>
      </>
    ),
  },
  {
    id: "artificial-intelligence",
    title: "Use of artificial intelligence technology",
    body: (
      <>
        <p>
          The Company may utilise Artificial Intelligence (&quot;AI&quot;) technologies in the provision and improvement
          of its Services. By accessing or using the Services, you acknowledge and agree as follows:
        </p>
        <p>
          The Services may include content, responses, or recommendations generated by AI systems, which may not be
          subject to prior human review or verification. Such outputs are provided on an &quot;as is&quot; basis and are
          subject to the disclaimers and limitations of liability set out in these Terms. While the Company may implement
          human oversight mechanisms for certain AI-driven processes at its sole discretion and in accordance with
          applicable laws and regulations, the Company makes no representation or warranty that any AI-generated output
          has been reviewed, validated, or approved by a human. You are solely responsible for evaluating the accuracy,
          completeness, and suitability of any AI-generated content and must not rely on the Company to do so.
        </p>
        <p>
          You acknowledge that, due to the probabilistic and evolving nature of AI and machine learning technologies,
          outputs generated through the Services may contain errors, inaccuracies, inconsistencies, or biases, and may
          not fully reflect the intended or correct outcome. The Company does not warrant or guarantee the accuracy,
          completeness, reliability, or fitness for any particular purpose of such outputs. Your use of any AI-generated
          content is at your own risk and discretion.
        </p>
        <p>
          The Company endeavours to comply with all applicable laws and regulations relating to the use of AI in Nigeria.
          However, you acknowledge that the regulatory framework governing AI is evolving and may change from time to
          time, which may affect the availability or functionality of the Services. You agree to comply with all
          applicable laws and regulations in connection with your use of the Services.
        </p>
        <p>
          If you are an organisation or institution that provides access to the Services for multiple authorised users
          (including, without limitation, schools, employers, or testing centres), you are responsible for ensuring that
          such users&apos; use of AI features complies with all applicable legal and regulatory requirements. This
          includes obtaining all necessary consents or authorisations (including parental or guardian consent where
          required) and complying with any applicable disclosure or transparency obligations relating to the use of AI.
        </p>
      </>
    ),
  },
  {
    id: "use-restrictions",
    title: "Use restrictions of the services",
    body: (
      <>
        <p>In your use of the Services, you agree that you shall not, whether directly or indirectly:</p>
        <ol className="!list-[lower-alpha]">
          <li>
            reproduce, copy, duplicate, modify, or create derivative works from any content provided by the Company,
            including assessment or testing materials, nor remove any proprietary notices, or use such content for
            competitive purposes, without the Company&apos;s prior written consent;
          </li>
          <li>
            rent, lease, lend, sell, license, sublicense, assign, distribute, publish, transfer, or otherwise make
            available the Services or any Company content to any third party;
          </li>
          <li>
            reverse engineer, decompile, disassemble, decode, adapt, or otherwise attempt to derive or gain unauthorised
            access to any part of the Services, software, systems, or networks connected to the Services;
          </li>
          <li>
            access or use the Services for the purpose of monitoring availability, performance, or functionality, or for
            benchmarking or competitive analysis;
          </li>
          <li>upload, transmit, or store any viruses, malware, or other harmful code through the Services;</li>
          <li>
            use the Services in any manner that infringes or violates any intellectual property rights, privacy rights,
            or other rights of any person, or that contravenes any applicable laws of the Federal Republic of Nigeria or
            any other relevant jurisdiction;
          </li>
          <li>
            probe, scan, test, or attempt to breach the security or authentication measures of the Services without
            prior written authorisation from the Company;
          </li>
          <li>
            distribute or disclose any part of the Services or content (including the case brief) through electronic or
            other means to any third party;
          </li>
          <li>
            engage in any unlawful, fraudulent, abusive, defamatory, libellous, invasive of another&apos;s privacy,
            tortious, obscene, profane, offensive, or otherwise improper conduct through the Services;
          </li>
          <li>
            use AI-generated outputs from the Services to develop competing services or misrepresent such outputs as
            professional advice or guidance;
          </li>
          <li>permit any authorised user to breach these restrictions or fail to ensure compliance by all authorised users.</li>
        </ol>
        <p>
          Without prejudice to any other rights or remedies available under applicable law, where you breach this
          Clause, the Company may, at its sole discretion: cancel any pending service; refuse future registrations;
          and/or deny any refunds for fees already paid.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property rights",
    body: (
      <>
        <h3>Company content</h3>
        <p>
          All content made available through the Services is owned by or licensed to the Company and is protected under
          applicable intellectual property laws, including the Copyright Act and international conventions. You shall not
          use such content without prior written consent.
        </p>
        <h3>Trademarks</h3>
        <p>
          All Company names, logos, trademarks, and related branding elements are the property of the Company or its
          licensors and may not be used without prior written permission.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "User content",
    body: (
      <>
        <h3>Licence grant</h3>
        <p>
          By submitting any content through the Services (&quot;User Content&quot;), you grant the Company a worldwide,
          non-exclusive, royalty-free licence to use, reproduce, modify, adapt, publish, and distribute such content for
          the purpose of operating, improving, and complying with legal obligations relating to the Services.
        </p>
        <p>
          You further agree that, to the extent permitted under applicable law, the Company may use such content without
          attribution or compensation, and you waive any moral rights that may apply under Nigerian law.
        </p>
        <h3>Representations and warranties</h3>
        <p>
          You represent and warrant that you have all necessary rights and permissions to submit User Content and that
          such content does not infringe any third-party rights, violate any law, or contain harmful or unlawful
          material.
        </p>
        <h3>Monitoring</h3>
        <p>
          The Company reserves the right, but not the obligation, to monitor, review, edit or remove any User Content at
          its discretion, for any or no reason, without notice.
        </p>
        <h3>Feedback</h3>
        <p>
          You may provide feedback, suggestions, or comments regarding the Services by contacting the Company through the
          communication channels listed on its website. All feedback is provided voluntarily, and the Company shall have
          no obligation of any kind with respect to such feedback, including any obligation of confidentiality.
        </p>
        <p>
          You represent and warrant that you have all necessary rights, permissions, and authority to submit such
          feedback. By submitting feedback, you hereby grant to the Company a perpetual, irrevocable, worldwide,
          non-exclusive, royalty-free, and fully sublicensable licence to use, reproduce, modify, adapt, publish,
          distribute, and otherwise exploit such feedback for any purpose related to the Services, without restriction
          and without any compensation or attribution to you, to the extent permitted under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "personal-data",
    title: "Processing of personal data",
    body: (
      <>
        <p>
          You are advised to review CallLawya Ltd&apos;s <Link href={ROUTES.privacy}>Privacy Policy</Link> for detailed
          information on how the Company collects, uses, stores, and protects any information relating to an identified
          or identifiable natural person (&quot;Personal Data&quot;).
        </p>
        <p>
          In relation to Services provided to primary or secondary Services, or otherwise involving the data of legal
          practitioners, clients or third parties, the Company complies with all applicable laws and regulations
          governing the protection of such data, as further outlined in the Company&apos;s Privacy Policy. You may also
          review the Company&apos;s Data Sharing Agreement for additional information on how such data may be shared with
          legal practitioners and other authorised parties.
        </p>
        <p>
          The Company may generate anonymous, aggregated, and/or de-identified data derived from information collected
          through your use of the Services and that of other users (&quot;Anonymised Data&quot;). You acknowledge and
          agree that the Company shall have an unrestricted, perpetual right to use such Anonymised Data for the purpose
          of improving its products and Services, as well as for any other lawful business purpose, provided that such
          data does not identify you personally.
        </p>
        <p>
          In the event of any loss or corruption of data, the Company shall use commercially reasonable efforts to
          restore such data from the most recent backup maintained in accordance with its internal data retention and
          archival procedures.
        </p>
        <p>
          You acknowledge and agree that such restoration efforts shall constitute the Company&apos;s sole obligation and
          liability in respect of any loss or corruption of data, and your sole and exclusive remedy in such
          circumstances.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party service providers",
    body: (
      <>
        <p>
          The Services may include links to third-party websites (&quot;Third-Party Websites&quot;), applications
          (&quot;Third-Party Applications&quot;), or advertisements (&quot;Third-Party Ads&quot;) (collectively,
          &quot;Third-Party Services&quot;). Access to such Third-Party Services is provided solely for your convenience
          and only to the extent necessary to facilitate the functionality of the Services.
        </p>
        <p>
          You acknowledge that when you access or use any Third-Party Service, you do so at your own risk and will be
          subject to the terms and conditions, including privacy policies, of such third-party providers. The Company
          shall not be obligated to notify you when you leave its platform.
        </p>
        <p>
          The Company does not control, and shall not be responsible for, any Third-Party Services, including their
          content, accuracy, availability, or data handling practices. The inclusion of any Third-Party Services does not
          constitute or imply endorsement, approval, or recommendation by the Company.
        </p>
        <p>
          The Company does not review, monitor, warrant, or make any representations regarding Third-Party Services or
          any products or services offered through them. You are solely responsible for reviewing applicable terms and
          policies, and for conducting any due diligence you consider necessary before engaging in any transaction or
          interaction with such third parties.
        </p>
        <p>
          Upon leaving the Company&apos;s Services, these Terms and any applicable Company policies shall no longer govern
          your activities. You are responsible for ensuring compliance with the applicable terms of any Third-Party
          Services you access.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <>
        <h3>Disclaimer of warranties</h3>
        <p>
          THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT
          PERMITTED UNDER APPLICABLE LAW, THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS,
          IMPLIED, OR STATUTORY, REGARDING THE OPERATION, AVAILABILITY, ACCURACY, RELIABILITY, MERCHANTABILITY, FITNESS
          FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF THE SERVICES OR ANY INFORMATION, CONTENT, OR MATERIALS MADE
          AVAILABLE THROUGH THE SERVICES.
        </p>
        <p>THE COMPANY, ITS SUPPLIERS, AND LICENSORS MAKE NO WARRANTY, REPRESENTATION OR CONDITION THAT:</p>
        <ol className="!list-[upper-alpha]">
          <li>
            THE SERVICES WILL MEET YOUR REQUIREMENTS, EXPECTATIONS, OR INTENDED PURPOSES, INCLUDING AS TO QUALITY,
            EFFECTIVENESS, OR PERFORMANCE;
          </li>
          <li>YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; OR</li>
          <li>
            ANY INFORMATION, ADVICE, OR RESULTS OBTAINED FROM THE USE OF THE SERVICES, WHETHER ORAL OR WRITTEN, WILL BE
            ACCURATE, COMPLETE, OR RELIABLE.
          </li>
        </ol>
        <p>
          ANY CONTENT DOWNLOADED FROM OR OTHERWISE ACCESSED THROUGH THE SERVICES, INCLUDING COMPANY CONTENT, IS ACCESSED
          AT YOUR OWN RISK. YOU SHALL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY, INCLUDING YOUR COMPUTER
          SYSTEMS, DEVICES, OR DATA, OR ANY OTHER LOSS ARISING FROM SUCH ACCESS OR USE.
        </p>
        <p>
          FROM TIME TO TIME, THE COMPANY MAY MAKE AVAILABLE NEW OR EXPERIMENTAL FEATURES OR TOOLS (&quot;BETA
          FEATURES&quot;) FOR TESTING OR EVALUATION PURPOSES. SUCH BETA FEATURES ARE PROVIDED STRICTLY ON AN &quot;AS
          IS&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, AND MAY BE MODIFIED, SUSPENDED, OR DISCONTINUED AT THE SOLE
          DISCRETION OF THE COMPANY. ALL DISCLAIMERS IN THIS CLAUSE SHALL APPLY FULLY TO SUCH BETA FEATURES.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE NIGERIAN LAW, THE COMPANY, ITS SUPPLIERS, LICENSORS, AND THEIR
          RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND CONTRACTORS (COLLECTIVELY, THE &quot;COMPANY
          PARTIES&quot;) SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
          WHATSOEVER. THIS INCLUDES, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF DATA, LOSS OF
          GOODWILL, BUSINESS INTERRUPTION, OR ANY LOSS ARISING FROM UNAUTHORISED ACCESS, ALTERATION, OR CORRUPTION OF
          DATA, OR FROM VIRUSES, DISTRIBUTED DENIAL-OF-SERVICE ATTACKS, OR OTHER HARMFUL TECHNOLOGICAL MATERIAL AFFECTING
          YOUR SYSTEMS OR DEVICES IN CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THE SERVICES.
        </p>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE TO YOU FOR MORE THAN THE GREATER OF:</p>
        <ol className="!list-[upper-alpha]">
          <li>
            THE TOTAL AMOUNT PAID BY YOU TO THE COMPANY WITHIN THE ONE (1) MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO
            THE CLAIM; OR
          </li>
          <li>
            WHERE APPLICABLE, ANY MINIMUM STATUTORY REMEDY OR PENALTY PRESCRIBED UNDER THE LAW PURSUANT TO WHICH SUCH
            CLAIM ARISES.
          </li>
        </ol>
        <p>
          NOTHING IN THESE TERMS SHALL LIMIT OR EXCLUDE LIABILITY TO THE EXTENT THAT SUCH LIMITATION OR EXCLUSION IS NOT
          PERMITTED UNDER APPLICABLE LAW, INCLUDING LIABILITY ARISING FROM DEATH OR PERSONAL INJURY CAUSED BY THE
          NEGLIGENCE OF THE COMPANY.
        </p>
        <p>
          YOU ACKNOWLEDGE AND AGREE THAT THE LIMITATIONS AND EXCLUSIONS OF LIABILITY SET OUT IN THIS CLAUSE FORM A
          FUNDAMENTAL BASIS OF THE AGREEMENT BETWEEN YOU AND THE COMPANY.
        </p>
        <p>
          WHERE APPLICABLE LAW DOES NOT PERMIT THE EXCLUSION OR LIMITATION OF CERTAIN LIABILITIES, SOME OF THE ABOVE
          LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS UNDER SUCH LAWS.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <>
        <p>
          You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, suppliers, and their
          respective directors, officers, employees, agents, successors, and assigns (collectively, the &quot;Company
          Parties&quot;) from and against any and all claims, actions, demands, liabilities, losses, damages, costs, and
          expenses (including, without limitation, reasonable legal and professional fees) arising out of or in
          connection with your breach of these Terms, or your access to, use of, or misuse of the Services and/or Company
          content, in each case to the fullest extent permitted under applicable law.
        </p>
        <p>
          The Company shall notify you of any claim, action, or proceeding subject to indemnification under this Clause.
          You shall, at your own expense, promptly assume the defence of such claim and provide all necessary cooperation
          in its defence.
        </p>
        <p>
          Notwithstanding the foregoing, the Company reserves the right, at its sole discretion, to assume exclusive
          control and defence of any matter subject to indemnification. In such circumstances, you agree to cooperate
          fully with the Company and comply with all reasonable requests in connection with such defence.
        </p>
      </>
    ),
  },
  {
    id: "international-users",
    title: "International users",
    body: (
      <p>
        The Services may be accessed from jurisdictions outside the Federal Republic of Nigeria and may contain
        references to products or services that are not available in certain locations. Such references do not imply
        that the Company intends to make such products or services available in those jurisdictions. The Services may be
        operated, controlled, or supported from jurisdictions outside Nigeria, including the United States of America.
        The Company makes no representation or warranty that the Services are appropriate, lawful, or available for use
        in any particular jurisdiction outside Nigeria. Persons who access or use the Services from outside Nigeria do so
        at their own initiative and are solely responsible for compliance with all applicable local laws and
        regulations.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    body: (
      <>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria,
          including but not limited to the Legal Practitioners Act, Rules of Professional Conduct for Legal Practitioners,
          and applicable data protection laws.
        </p>
        <p>
          For users resident in Nigeria or any jurisdiction not expressly covered below, these Terms shall be governed by
          and construed in accordance with the laws of the Federal Republic of Nigeria. The courts of competent
          jurisdiction in Nigeria shall have exclusive jurisdiction over any dispute arising out of or in connection with
          these Terms.
        </p>
        <p>
          For users resident in the United States or any non-European Union country, these Terms shall be governed by the
          laws of the State of Maryland, United States of America, together with applicable U.S. federal laws, without
          regard to conflict of law principles. The courts located in Baltimore County, Maryland shall have exclusive
          jurisdiction.
        </p>
        <p>For users contracting from Canada, these Terms shall be governed by the laws of the Province of British Columbia, Canada.</p>
        <p>
          For users resident in the European Union, United Kingdom, or Switzerland, these Terms shall be governed by the
          laws of Ireland, without regard to its conflict of law principles.
        </p>
        <p>
          To the fullest extent permitted by applicable law, all claims must be brought on an individual basis and not as
          part of any class, collective, or representative action. Where applicable, each party waives any right to a
          trial by jury.
        </p>
      </>
    ),
  },
  {
    id: "general-provisions",
    title: "General provisions",
    body: (
      <>
        <h3>Electronic communications</h3>
        <p>
          You acknowledge that communications between you and the Company may take place electronically, including
          through the Company&apos;s website or platforms, by email, or through notices posted on the Services.
        </p>
        <p>
          For contractual purposes, you hereby consent to receive communications from the Company in electronic form and
          agree that all agreements, notices, disclosures, and other communications provided electronically satisfy any
          legal requirement that such communications be in writing.
        </p>
        <p>
          Nothing in this Clause shall affect your statutory rights under applicable Nigerian law relating to electronic
          transactions and communications.
        </p>

        <h3>Assignment</h3>
        <p>
          You shall not assign, transfer, delegate, or otherwise dispose of your rights or obligations under these Terms
          without the prior written consent of the Company.
        </p>
        <p>
          The Company may, at its discretion and without your consent, assign or transfer these Terms, in whole or in
          part, including in connection with any merger, acquisition, restructuring, or transfer of business or assets.
        </p>
        <p>Any purported assignment or transfer in violation of this Clause shall be null and void.</p>

        <h3>Force majeure</h3>
        <p>
          The Company shall not be liable for any delay or failure in performance arising from events beyond its
          reasonable control, including but not limited to acts of God, war, terrorism, civil unrest, embargoes, actions
          of governmental authorities, fire, flood, accident, pandemic, strikes, or shortages of labour, energy, fuel, or
          transportation.
        </p>

        <h3>Consumer complaints</h3>
        <p>
          If you have any complaints regarding the Services, you may contact the Company through the communication
          channels provided on its website, including our <Link href={ROUTES.contact}>contact page</Link>.
        </p>
        <p>
          Where applicable, you may also seek redress through relevant consumer protection authorities in Nigeria,
          including the Federal Competition and Consumer Protection Commission.
        </p>

        <h3>Updates to terms</h3>
        <p>
          The Company reserves the right to modify or update these Terms, as well as any supplemental terms, from time to
          time. Where changes are made, the Company will update the &quot;Last updated&quot; date and publish the revised
          Terms on its platform.
        </p>
        <p>
          Unless otherwise stated, such changes shall take effect immediately upon publication. Your continued use of the
          Services after any such update constitutes your acceptance of the revised Terms.
        </p>

        <h3>Choice of language</h3>
        <p>
          These Terms may be made available in multiple languages for convenience. In the event of any inconsistency or
          conflict between a translated version and the English version, the English version shall prevail and be the
          binding version for all purposes.
        </p>

        <h3>Notice</h3>
        <p>
          Where the Company requires you to provide an email address, you are responsible for ensuring that such email
          address is valid, active, and capable of receiving communications at all times.
        </p>
        <p>
          If the email address provided by you is invalid, inactive, or otherwise incapable of receiving notices required
          under these Terms, any notice sent by the Company to such email address shall nonetheless be deemed valid and
          effective upon dispatch.
        </p>
        <p>
          You may provide formal notice to the Company via the designated email address:{" "}
          <a href={`mailto:${NOTICE_EMAIL}`}>{NOTICE_EMAIL}</a>. Any notice submitted to the Company shall be deemed
          received only upon confirmation of receipt by the Company.
        </p>

        <h3>Enforcement</h3>
        <p>
          As referenced in the &quot;Account creation and security&quot; section, you agree to promptly notify the
          Company of any suspected or actual breach of these Terms. You further agree to cooperate fully with the Company
          in relation to: (i) any investigation into such suspected or actual breach; and (ii) any enforcement action
          taken by the Company to ensure compliance with these Terms.
        </p>

        <h3>Waiver</h3>
        <p>
          No failure, delay, or omission by the Company in exercising any right, power, or remedy under these Terms shall
          operate as a waiver of such right, power, or remedy.
        </p>
        <p>
          Any waiver granted in respect of a particular instance shall not be deemed a waiver of any other provision or
          any subsequent breach of the same or any other provision.
        </p>

        <h3>Severability</h3>
        <p>
          If any provision of these Terms is held by a court or competent authority to be invalid, illegal, or
          unenforceable under applicable law, such provision shall be severed to the extent necessary. The remaining
          provisions shall continue in full force and effect and remain binding on the parties.
        </p>

        <h3>Export control</h3>
        <p>You agree to comply with all applicable export control and sanctions laws in connection with your use of the Services.</p>
        <p>
          Without limiting the generality of the foregoing, you shall not use, export, re-export, import, or transfer the
          Services except as permitted under applicable laws, including the laws of the United States, the Federal
          Republic of Nigeria, and any other relevant jurisdiction.
        </p>
        <p>In particular, you shall not directly or indirectly export or re-export the Services:</p>
        <ol className="!list-[lower-alpha]">
          <li>to any country subject to applicable international sanctions or embargoes; or</li>
          <li>
            to any person or entity listed on applicable restricted or prohibited parties lists issued by relevant
            authorities, including the United States Department of the Treasury or the Department of Commerce.
          </li>
        </ol>
        <p>
          You represent and warrant that you are not located in, or a national or resident of, any sanctioned or embargoed
          country, and that you are not listed on any applicable restricted parties list.
        </p>
        <p>
          You further agree not to use the Services for any unlawful or prohibited purpose, including the development,
          design, manufacture, or production of nuclear, chemical, biological, or other weapons of mass destruction.
        </p>

        <h3>Entire agreement</h3>
        <p>
          These Terms constitute the entire agreement between you and the Company with respect to your access to and use
          of the Services and CallLawya Content, and supersede all prior and contemporaneous understandings, agreements,
          representations, and warranties, whether written or oral, relating to the subject matter herein.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      current="terms"
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="28 October 2026"
      intro={
        <p>
          Please read these Terms carefully. They govern your use of the CallLawya platform and apply to all users,
          clients and legal practitioners.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
