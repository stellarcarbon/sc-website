"use client";

import SCLink from "@/components/SCLink";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col font-noto py-8 px-4 md:px-32 md:max-w-[1200px] md:mx-auto">
      <style jsx>{`
        h1, h2, h3 {
          margin-bottom: 0.5em;
        }
        
        h1 {
          font-size: 32px;
          font-weight: bold;
          counter-reset: clause;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
        }
        h2:before {
            content: counter(clause) ".  ";
            counter-increment: clause;
        }

        h3 {
          font-size: 20px;
          font-weight: bold;
        }

        p {
          font-size: 16px;
        }
      `}</style>

      <h1>Privacy Policy</h1>
      <p>
        Last updated: September 12, 2025
      </p>

      <h2>Introduction</h2>
      <p>
        This Privacy Policy explains how Stellarcarbon collects, uses, and protects 
        your personal data when you use our services. We are committed to protecting your privacy and 
        complying with the General Data Protection Regulation (GDPR) and other applicable laws. This 
        Privacy Policy applies universally to all users, with no special treatment for EU or non-EU 
        residents, though we may distinguish between consumers and business users where necessary for 
        compliance.
      </p>
      <p>
        Our services, including the dApp, HTTP API, and Soroban smart contracts, involve minimal personal 
        data collection. We do not use cookies but rely on browser local storage for functionality. Data 
        submitted to the Stellar Network is permanent and cannot be modified or removed.
      </p>
      <p>
        Reading the <SCLink href="/terms-of-use">Terms of Use</SCLink> first will help you understand
        the terminology used in this Privacy Policy. If you have questions, contact us at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink>.
      </p>

      <h2>Legal Basis for Processing</h2>
      <p>
        We process personal data on the following legal bases under the General Data Protection Regulation 
        (GDPR). This ensures that all processing activities are lawful and transparent.
      </p>
      <p>
        <strong>Legal Obligation</strong>: We process data to comply with tax requirements, such as VAT 
        records and the retention of transaction and geolocation data.
      </p>
      <p>
        <strong>Legitimate Interests</strong>: We process data for security purposes, such as logging IP 
        addresses, and for analytics through Plausible, as well as for service delivery, including Stellar 
        Account identification.
      </p>
      <p>
        <strong>Consent</strong>: We process data for optional features like invoice requests or personal 
        certificates, that require sharing your name and email. If you do not wish to use these features,
        you do not need to provide us with your personal data.
      </p>
      <p>
        We do not engage in automated decision-making or profiling with legal effects.
      </p>

      <h2>Data We Collect</h2>
      <p>
        We collect only the data necessary to provide our services, comply with legal obligations, and 
        ensure security. The following categories outline what we gather and why it is essential.
      </p>
      <p>
        <strong>Identification Data</strong>: Your Stellar Account address, used to uniquely identify you 
        as a recipient for CARBON sinking and CarbonSINK issuance.
      </p>
      <p>
        <strong>Contact Data</strong>: Name and email address, collected during recipient registration for 
        communication and certificate issuance.
      </p>
      <p>
        <strong>Transaction Data</strong>: Stellar Transaction IDs and related details, such as the amount 
        sunk and the amount paid, stored for auditability and tax compliance.
      </p>
      <p>
        <strong>Geolocation and Access Data</strong>: IP addresses, Cloudflare CF-IPCountry headers, and 
        device fingerprints, logged for security and VAT compliance. Currently, we store full IP addresses, 
        but we are investigating anonymization options for long-term storage.
      </p>
      <p>
        <strong>Self-Declared Data</strong>: Country of establishment or residence, provided during 
        recipient registration.
      </p>
      <p>
        <strong>Invoice Data</strong>: Name, address, VAT number (with VIES verification for EU users), and 
        business details, only if you request an invoice. This is optional for consumers and business 
        users, and the VAT number and other business details can only be provided by business users.
      </p>
      <p>
        <strong>Analytics Data</strong>: Anonymous usage data via Plausible Analytics, which uses a 
        cookieless, compliant tracking approach using local storage for aggregate statistics like page 
        views and device types.
      </p>
      <p>
        <strong>Local Storage Data</strong>: Browser local storage for session management, preferences, and 
        Plausible analytics. This data is non-personal.
      </p>

      <h2>How We Use Your Data</h2>
      <p>
        We process data for specific purposes, ensuring each use is justified and limited to what is 
        necessary. Below, we detail how your data supports our operations.
      </p>
      <p>
        <strong>Service Delivery</strong>: We use data to identify recipients via Stellar Account 
        addresses, process sinking transactions, and issue certificates.
      </p>
      <p>
        <strong>Compliance</strong>: We use data to verify country of residence for VAT, with geolocation 
        logs as supporting evidence. Business users’ VAT numbers are verified via VIES for EU compliance.
      </p>
      <p>
        <strong>Security</strong>: We use data to log access details, such as IP addresses and device 
        fingerprints, to prevent abuse.
      </p>
      <p>
        <strong>Analytics</strong>: We use anonymous tracking via Plausible to improve services. This does 
        not involve individual profiling.
      </p>
      <p>
        <strong>Certificates and Invoices</strong>: We use name and email for retirement certificates. We 
        use invoice data for billing requests.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain data only as long as necessary for the stated purposes or to meet legal requirements. 
        Below, we explain the retention periods for each category.
      </p>
      <p>
        <strong>Transaction and Identification Data</strong>: This data is retained indefinitely on the 
        Stellar Network, which is public and immutable. For tax purposes, we retain basic records for 7 
        years and cross-border EU data for 10 years.
      </p>
      <p>
        <strong>Contact and Invoice Data</strong>: This data is retained for 7 to 10 years per tax 
        obligations, or until no longer needed for certificates or invoices.
      </p>
      <p>
        <strong>Geolocation and Access Data</strong>: This data is retained for 30 days for full IP 
        addresses due to security needs. For long-term tax records, we use full IP addresses, but we are 
        investigating anonymization for GDPR compliance.
      </p>
      <p>
        <strong>Analytics Data</strong>: This data is aggregate only and retained per Plausible’s policy. 
        It is anonymized, with no personal retention.
      </p>
      <p>
        <strong>Local Storage Data</strong>: This data is retained until cleared by your browser.
      </p>
      <p>
        Data is deleted or anonymized when no longer needed, with backups to prevent loss while enabling 
        deletion after retention periods.
      </p>

      <h2>Data Sharing and Transfers</h2>
      <p>
        We share data only when necessary and with appropriate safeguards. Below, we detail our sharing 
        practices.
      </p>
      <p>
        <strong>Verra</strong>: Name and email for certificate issuance; Verra’s privacy policy at{" "}
        <SCLink href="https://verra.org/privacy-policy/" target="_blank">
          verra.org/privacy-policy
        </SCLink> applies.
      </p>
      <p>
        <strong>Twilio Inc.</strong>: Email addresses when we send you automated emails; Twilio’s 
        privacy policy at <SCLink href="https://www.twilio.com/en-us/legal/privacy" target="_blank">
          twilio.com/legal/privacy
        </SCLink> applies.
      </p>
      <p>
        <strong>Plausible Analytics</strong>: Anonymous data for web tracking; Plausible’s privacy policy 
        at <SCLink href="https://plausible.io/privacy" target="_blank">plausible.io/privacy</SCLink> applies.
      </p>
      <p>
        Plausible is GDPR-compliant because it does not use cookies and collects only anonymous, aggregate 
        data for website visitors, focusing on trends without tracking personal information, all stored on 
        EU servers. Compliance is maintained through GDPR-friendly practices, including using services like
        hCaptcha and ensuring data never leaves the EU, aligning with user privacy rights.
      </p>
      <p>
        <strong>Legal Requirements</strong>: We may share data with authorities for tax or regulatory 
        compliance (e.g., Belastingdienst).
      </p>
      <p>
        <strong>Cloud infrastructure</strong>: the dApp and API are hosted in an EU datacenter, operated by 
        DigitalOcean. International transfers use GDPR safeguards, detailed in the Data Processing Agreement
        (<SCLink href="https://www.digitalocean.com/legal/data-processing-agreement" target="_blank">
          digitalocean.com/legal/data-processing-agreement
        </SCLink>).
      </p>
      <p>
        No data is shared for marketing or sold.
      </p>

      <h2>Your Rights</h2>
      <p>
        Under GDPR, you have rights to access, rectification, erasure, restriction, portability, objection, 
        and withdrawal of consent. Contact us at <SCLink href="mailto:support@stellarcarbon.io">
          support@stellarcarbon.io
        </SCLink> to exercise them (response within 1 month). Note: immutable Stellar Network data cannot
        be erased (GDPR Article 17(3)(b) exception). You may lodge complaints with the Dutch Data Protection
        Authority (Autoriteit Persoonsgegevens) at <SCLink 
          href="https://www.autoriteitpersoonsgegevens.nl" target="_blank"
        >
          autoriteitpersoonsgegevens.nl
        </SCLink>.
      </p>

      <h2>Security</h2>
      <p>
        We implement appropriate technical and organizational measures (e.g., encryption, access controls)
        to protect data from unauthorized access, loss, or disclosure. We notify you and authorities of 
        breaches as required by GDPR.
      </p>

      <h2>Data Protection Officer</h2>
      <p>
        As a small sole proprietorship, we are not required to appoint a Data Protection Officer under 
        GDPR Article 37, but privacy inquiries can be directed to <SCLink href="mailto:support@stellarcarbon.io">
          support@stellarcarbon.io
        </SCLink>.
      </p>

      <h2>Children's Data</h2>
      <p>
        Our services are not directed to children under 13, and we do not knowingly collect their data. 
        Minors under 18 require parental consent.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy, with changes posted on our website or dApp and notified via 
        email where required. Continued use of our services constitutes acceptance of this Privacy Policy.
      </p>

      <h2>Contact Information</h2>
      <p>
        For questions or to exercise your rights, contact us at <SCLink href="mailto:support@stellarcarbon.io">
          support@stellarcarbon.io
        </SCLink>.
      </p>

    </main>
  );
}
