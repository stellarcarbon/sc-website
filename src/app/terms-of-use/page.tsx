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

      <h1>Terms of Use</h1>
      <p>
        Last updated: September 12, 2025<br/>
        Effective: September 12, 2025
      </p>

      <h2>Introduction</h2>
      <p>
        Welcome to Stellarcarbon, where we make it simple for individuals and businesses to support 
        direct climate action by sinking CARBON tokens on the Stellar Network. We handle the 
        retirement of Verified Carbon Units (VCUs) in the Verra Registry. Our services include a 
        web-based dApp, HTTP API, and Soroban smart contracts, enabling you to contribute to verified
        rainforest conservation projects with transparency and auditability. These Terms of Use (“ToU”)
        govern your use of our services, so please read them carefully.
      </p>
      <p>
        By using our services, including sinking CARBON tokens or receiving CarbonSINK tokens, you 
        agree to be bound by these ToU, which form a contract between you and Stellarcarbon, a sole 
        proprietorship registered in the Netherlands with the Chamber of Commerce (KVK) under number
        89409817. If you are acting on behalf of a business, the business accepts these ToU as the 
        contracting party.
      </p>
      <p>
        We may update these ToU to reflect changes in our services, legal requirements, or 
        technological developments. Updates will be posted on our website or dApp with at least 14 
        days’ notice, except for changes required for legal, safety, or new feature reasons, which 
        may take effect immediately. If you do not agree with the updated ToU, you should 
        discontinue using our services.
      </p>
      <p>
        For more information on how we handle your data, please review our separate{" "}
        <SCLink href="/privacy-policy">Privacy Policy</SCLink>. 
        If you have questions or need support, contact us at <SCLink href="mailto:support@stellarcarbon.io">
          support@stellarcarbon.io
        </SCLink>.
      </p>

      <h2>Definitions</h2>
      <p>
        To help you understand these Terms of Use (“ToU”), we’ve defined key terms used throughout this 
        document:
      </p>
      <p>
        <strong>CARBON</strong>: A payment token on the Stellar Network issued by Stellarcarbon, used to 
        instruct the retirement of Verified Carbon Units (VCUs) in the Verra Registry. CARBON is not 
        exchangeable for VCUs and has no inherent market value beyond its use for sinking.
      </p>
      <p>
        <strong>CarbonSINK</strong>: A non-tradeable token minted on the Stellar Network as proof of your 
        contribution when you sink CARBON. It represents a retired VCU and cannot be transferred or traded.
      </p>
      <p>
        <strong>Verified Carbon Unit (VCU)</strong>: A unit representing one metric ton of CO₂e reduction, 
        verified and issued by the Verra Registry, retired on your behalf when you sink CARBON.
      </p>
      <p>
        <strong>Sinking</strong>: The process of spending CARBON tokens in a Stellar Network transaction, 
        converting them to locked CarbonSINK tokens, and triggering Stellarcarbon to retire an equivalent VCU.
      </p>
      <p>
        <strong>Retirement</strong>: The permanent removal of a VCU from circulation in the Verra Registry, 
        documented in a personal or community certificate, representing a claimable CO₂e reduction.
      </p>
      <p>
        <strong>Verra Registry</strong>: The global registry operated by Verra, tracking the issuance, 
        transfer, and retirement of VCUs for carbon offset projects.
      </p>
      <p>
        <strong>Stellar Network</strong>: A decentralized blockchain network used for CARBON and CarbonSINK 
        transactions, not controlled by Stellarcarbon, where transactions are permanent and public.
      </p>
      <p>
        <strong>Stellar Account</strong>: Your account on the Stellar Network, authenticated via a 
        wallet/keypair, used to initiate CARBON sinking transactions with Stellarcarbon.
      </p>
      <p>
        <strong>Recipient Registration</strong>: The process of registering your Stellar Account with 
        Stellarcarbon via our dApp or API, including disclosing your country of residence for VAT 
        compliance.
      </p>
      <p>
        <strong>Grace Period</strong>: A limited time after sinking CARBON during which you may request a 
        personal retirement certificate for fractional transactions, before inclusion in a community 
        certificate.
      </p>
      <p>
        <strong>Community Certificate</strong>: A certificate issued by Verra for aggregated 
        fractional VCU retirements, automatically processed after the grace period.
      </p>

      <h2>Eligibility and Account Requirements</h2>
      <p>
        To use Stellarcarbon’s services, you must meet the following requirements, ensuring compliance with 
        Dutch law and the laws of your country of residence:
      </p>
      <p>
        <strong>Age</strong>: You must be at least 13 years old. If you are under 18, you must have 
        parental or legal guardian consent, in accordance with GDPR for EU users.
      </p>
      <p>
        <strong>Restricted Jurisdictions</strong>: You may not use our services if you reside in or are 
        subject to the laws of FATF high-risk jurisdictions, or if you are subject to sanctions imposed by 
        the United Nations, European Union, or the Netherlands. You are also prohibited if CARBON sinking 
        is illegal in your country.
      </p>
      <p>
        <strong>Stellar Wallet</strong>: You must use a third-party Stellar wallet to authenticate your 
        Stellar Account. Stellarcarbon does not provide wallet services, and you are responsible for 
        securing your wallet and private keys.
      </p>
      <p>
        <strong>Recipient Registration</strong>: You must register your Stellar Account with Stellarcarbon 
        via our dApp or API, accurately disclosing your country of establishment or residence for VAT 
        compliance. You must update this information immediately if it changes, before initiating new 
        sinking transactions. Failure to comply may result in suspension of your access.
      </p>
      <p>
        <strong>Consumer Access Restriction</strong>: If you are a consumer under Dutch or EU law, you must
        use our dApp to access our services and are prohibited from using the API or Soroban smart 
        contracts. This ensures you provide explicit consent to waive your right of withdrawal, as 
        required for the permanent and irrevocable nature of CARBON sinking transactions.
      </p>
      <p>
        <strong>Intermediaries</strong>: If you use our API or Soroban smart contracts to facilitate 
        sinking transactions for others (e.g., as a business or developer), you are responsible for 
        providing these ToU to those users and ensuring the accuracy of their country of residence 
        disclosures. Those users are also bound by these ToU.
      </p>

      <h2>Services and Sinking Process</h2>
      <p>
        Stellarcarbon provides a registry bridge connecting the Stellar Network to the Verra Registry, 
        allowing you to sink CARBON tokens to retire VCUs in support of verified rainforest conservation 
        projects. Our services are accessible via a web-based dApp, HTTP API, or Soroban smart contracts.
      </p>
      <p>
        <strong>Sinking Process</strong>: When you sink CARBON tokens, you initiate a Stellar Network 
        transaction that removes the tokens from circulation and replaces them with non-tradeable, locked
        CarbonSINK tokens. This creates an obligation for Stellarcarbon to retire an equal amount of VCUs
        in the Verra Registry, maintaining a 1:1 correspondence between CARBON sunk and VCUs retired.
      </p>
      <p>
        <strong>Retirement Certificates</strong>: Upon retirement, you may receive a personal certificate
        for whole VCU retirements or a community certificate for aggregated fractional retirements. 
        Certificates document your contribution to climate goals but should not be the sole basis for 
        environmental claims without independent verification, to avoid greenwashing (see Clawback 
        Policy).
      </p>
      <p>
        <strong>Fractional Retirements</strong>: You may sink fractional amounts (e.g., 1.5 tons), which 
        are not directly supported by Verra. During a grace period (displayed in the dApp or API), you 
        may request a personal certificate by rounding up or down. After the grace period, fractional 
        amounts are aggregated into a community certificate, but retirement may be delayed or remain 
        pending indefinitely.
      </p>
      <p>
        <strong>Token Clarification</strong>: CARBON is a payment token used to instruct VCU retirements, 
        not exchangeable for VCUs. CarbonSINK tokens are proof of contribution with no market value and 
        cannot be traded or transferred.
      </p>
      <p>
        <strong>Transparency</strong>: All sinking transactions are publicly visible on Stellar Network 
        explorers and our audit tool, with retirements traceable to transaction hashes. Temporary 
        discrepancies between CARBON/CarbonSINK and VCU inventories may occur due to fractional 
        retirements or processing delays.
      </p>

      <h2>User Obligations</h2>
      <p>
        To ensure Stellarcarbon operates transparently and complies with applicable laws, you agree to the 
        following obligations when using our services:
      </p>
      <p>
        <strong>Lawful Use</strong>: You must use our services, including the dApp, API, and Soroban smart 
        contracts, in compliance with Dutch law, the laws of your country of residence, and these ToU. You 
        may not engage in fraudulent transactions, misrepresentations, or activities that disrupt our 
        services, the Stellar Network, or the Verra Registry.
      </p>
      <p>
        <strong>Wallet Security</strong>: You are responsible for securing your third-party Stellar wallet 
        and private keys. Stellarcarbon does not provide wallet services and is not liable for losses due 
        to compromised wallets or keys.
      </p>
      <p>
        <strong>No Greenwashing</strong>: You must not make false environmental claims, false marketing 
        statements, or engage in regulatory violations involving your use of CARBON or CarbonSINK tokens, 
        as these may harm Stellarcarbon’s reputation or mislead others. Such actions are subject to our 
        Clawback Policy (see below). We recommend adhering to the{" "}
        <SCLink href="https://vcmintegrity.org/vcmi-claims-code-of-practice/" target="_blank">
          VCMI Claims Code of Practice
        </SCLink> for sustainability claims.
      </p>
      <p>
        <strong>VAT Disclosure</strong>: You must accurately disclose and update your country of 
        establishment or residence in your recipient registration via our dApp or API before initiating 
        sinking transactions. Failure to provide accurate or updated information may result in suspension 
        of your access until resolved.
      </p>
      <p>
        <strong>Intermediaries</strong>: If you use our API or Soroban smart contracts to facilitate 
        sinking transactions for others, you must provide these ToU to those users and ensure the accuracy 
        of their country of residence disclosures. You are liable for any inaccuracies in these 
        disclosures, as outlined in the Indemnification for VAT Disclosure section.
      </p>
      <p>
        <strong>Business Authority</strong>: If you act on behalf of a business, you represent and warrant 
        that you have the authority to bind the business to these ToU, and the business is the 
        contracting party, not you as an individual.
      </p>

      <h2>Clawback Policy</h2>
      <p>
        Stellarcarbon is committed to preventing greenwashing and protecting our reputation, partners, and 
        users. We reserve the right to claw back CarbonSINK tokens under specific conditions to ensure the 
        integrity of our services.
      </p>
      <p>
        <strong>Clawback Conditions</strong>: We may claw back CarbonSINK tokens if you engage in 
        greenwashing, including false environmental claims, false marketing, or regulatory violations 
        related to your use of our services that cause reputational harm to Stellarcarbon, its agents, 
        partners, or users. Examples include misrepresenting CarbonSINK proof-of-contribution as
        guaranteeing environmental impact without independent verification.
      </p>
      <p>
        <strong>Process</strong>: If we identify a potential violation, we will notify you via email or 
        the dApp, specifying the issue and providing at least 14 days to resolve it with our guidance. If 
        the issue remains unresolved, we may claw back part or all of your CarbonSINK balance and issue a 
        public statement distancing Stellarcarbon from your actions. No refunds will be provided for 
        clawed-back tokens.
      </p>
      <p>
        <strong>Guidance</strong>: To avoid clawback, we recommend following the{" "}
        <SCLink href="https://vcmi.org/claims-code-of-practice" target="_blank">
          VCMI Claims Code of Practice
        </SCLink> when making sustainability claims involving Stellarcarbon services. Contact us at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink> for assistance in 
        resolving concerns.
      </p>

      <h2>Transparency and Auditability</h2>
      <p>
        Stellarcarbon is built on transparency, ensuring you can trust the impact of your contributions. 
        Our services are designed to be auditable and traceable, leveraging the Stellar Network and Verra 
        Registry.
      </p>
      <p>
        <strong>Public Transactions</strong>: All CARBON sinking transactions are publicly visible on 
        Stellar Network explorers and our audit tool, accessible via{" "}
        <SCLink href="/software">stellarcarbon.io/software</SCLink>. Each transaction is identified by a 
        unique hash, allowing you to verify its authenticity.
      </p>
      <p>
        <strong>Retirement Traceability</strong>: VCU retirements in the Verra Registry are traceable to 
        the corresponding Stellar Network transaction hashes, ensuring a 1:1 correspondence between CARBON 
        sunk and VCUs retired.
      </p>
      <p>
        <strong>Inventory Discrepancies</strong>: Temporary discrepancies may occur between CARBON or 
        CarbonSINK tokens and VCU inventories due to fractional retirements or processing delays. These 
        are resolved through community certificates or manual processing, as outlined in the Services and 
        Sinking Process section. We disclose these discrepancies in our audit tool for full transparency.
      </p>

      <h2>Fees and Payments</h2>
      <p>
        Stellarcarbon makes sinking CARBON tokens simple and transparent, with all fees included in the 
        transaction process.
      </p>
      <p>
        <strong>Fee Structure</strong>: All fees are included in the price of CARBON tokens at the time of 
        sinking. No additional fees are charged for VCU retirements or certificate issuance. The Stellar
        Network charges a small transaction fee as a spam-prevention measure, which is paid by the user.
      </p>
      <p>
        <strong>Atomic Transactions</strong>: Sinking transactions on the Stellar Network are atomic, 
        meaning payment and delivery (exchanging CARBON for CarbonSINK) occur together. If a transaction
        fails, no payment is processed.
      </p>
      <p>
        <strong>Cooling-Off Waiver</strong>: By using our services, you acknowledge that CARBON sinking 
        transactions and VCU retirements are permanent and irrevocable, linked to your Stellar Account. 
        Consumers waive the 14-day cooling-off period under Dutch law by providing explicit consent via 
        the dApp before they sign a transaction with their wallet.
      </p>
      <p>
        <strong>Technical Failures</strong>: In the rare event of a technical failure (e.g., Stellar 
        Network or Verra integration issues), Stellarcarbon will make a best-effort attempt to resolve the 
        issue fairly, such as by processing retirements manually. No formal refund policy applies, as 
        atomic transactions ensure no payment is made if delivery fails.
      </p>

      <h2>Risks and Disclaimers</h2>
      <p>
        Stellarcarbon’s services rely on experimental technology and third-party systems. We provide our 
        services “as is” and “with all faults,” with reasonable skill and care, to the maximum extent 
        permitted by Dutch law. Below are key risks you should understand:
      </p>
      <p>
        <strong>Stellar Network Risks</strong>: We do not control the Stellar Network. Transactions are 
        permanent, public, and cannot be reversed or modified. Transactions may fail for any reason (e.g., 
        network congestion), but atomic transactions ensure no payment is processed if delivery fails.
      </p>
      <p>
        <strong>Verra Integration Risks</strong>: Verra Registry integration may fail due to Verra’s 
        actions, causing delays in VCU retirements. We commit to best-effort fixes or manual processing, 
        but we cannot guarantee resolution.
      </p>
      <p>
        <strong>Fractional Retirement Delays</strong>: Fractional transactions may remain “pending 
        retirement” after the grace period, potentially indefinitely, as they await aggregation into 
        community certificates.
      </p>
      <p>
        <strong>Auditor Errors</strong>: Errors by Verra-accredited validation/verification bodies (VVBs) 
        may reduce the environmental benefit stated in retirement certificates.
      </p>
      <p>
        <strong>Cybersecurity Threats</strong>: Attacks on Stellarcarbon’s Stellar Accounts (e.g., hacking, 
        malware) may disrupt services. Partial remediation may be possible, but full recovery is not 
        guaranteed. Advances in cryptography (e.g., quantum computing) could also impact the Stellar 
        Network.
      </p>
      <p>
        <strong>VCU Theft</strong>: Theft of VCUs from Stellarcarbon’s Verra Registry account could prevent 
        us from fulfilling retirement obligations, impacting CARBON’s value. We recommend holding only 
        CARBON needed for same-day transactions.
      </p>
      <p>
        <strong>Third-Party Reliance</strong>: We rely on third parties (e.g., Verra, Stellar Network, 
        VVBs) without endorsing them. We are not liable for their failures or actions.
      </p>
      <p>
        <strong>Regulatory Changes</strong>: Changes in laws (e.g., anti-money laundering, carbon credit 
        regulations) may impact service availability.
      </p>
      <p>
        <strong>Environmental Claims</strong>: sinking transactions are linked to VCU retirements but should 
        not be the sole basis for environmental or sustainability claims without independent verification,
        to avoid greenwashing (see Clawback Policy).
      </p>
      <p>
        <strong>No Warranties</strong>: We disclaim all warranties (e.g., merchantability, fitness for a 
        particular purpose) to the maximum extent permitted by law. We do not guarantee environmental 
        impact beyond VCU retirement.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Stellarcarbon owns the intellectual property rights to our services, including the dApp, HTTP API, 
        and Soroban smart contracts, unless otherwise specified. Your use of our services is subject to 
        these Terms of Use (ToU) and any applicable licenses.
      </p>
      <p>
        <strong>Ownership</strong>: Stellarcarbon retains all rights, title, and interest in our dApp, API, 
        and related software, including any updates, modifications, or derivative works. Using our services 
        does not grant you ownership of any intellectual property rights in our services or content you 
        access, except as provided below.
      </p>
      <p>
        <strong>Open-Source Components</strong>: Some components of our API and Soroban smart contracts are 
        offered under open-source licenses, as listed on our software page at{" "}
        <SCLink href="/software">stellarcarbon.io/software</SCLink>. These licenses may permit you to use, 
        modify, or distribute certain components, subject to their terms. Provisions in open-source 
        licenses may override parts of these ToU.
      </p>
      <p>
        <strong>Limited License</strong>: We grant you a non-exclusive, non-transferable, revocable license 
        to use our services for their intended purpose (e.g., sinking CARBON tokens), subject to these ToU. 
        You may not copy, modify, distribute, or reverse-engineer our services without our written consent, 
        except as allowed by open-source licenses.
      </p>
      <p>
        <strong>User Content</strong>: Any content you submit (e.g., transaction memos) remains yours, but 
        you grant Stellarcarbon a worldwide, royalty-free license to use, store, and display it as needed 
        to provide our services, including on the Stellar Network, which is public and permanent.
      </p>

      <h2>Indemnification for VAT Disclosure</h2>
      <p>
        You indemnify Stellarcarbon for damages arising from inaccurate or outdated country of residence 
        disclosures in your recipient registration, including tax-related liabilities. This applies to all 
        users, including intermediaries facilitating transactions for others.
      </p>

      <h2>Business Uses</h2>
      <p>
        These ToU apply equally to all users, including individuals, developers, and businesses using our 
        dApp, API, or Soroban smart contracts. If you use our services on behalf of a business, the 
        business accepts these ToU as the contracting party, not you as an individual.
      </p>
      <p>
        Businesses will hold harmless and indemnify Stellarcarbon, its agents, and partners from any 
        claim, suit, or action arising from your use of our services or violation of these ToU, including 
        any liability or expense from losses, damages, or legal fees, to the extent permitted by Dutch law.
      </p>

      <h2>Privacy and Data Protection</h2>
      <p>
        Stellarcarbon collects minimal personal data, such as Stellar Account addresses and transaction 
        details, to provide our services. We comply with GDPR and other applicable data protection laws.
      </p>
      <p>
        For details on how we collect, use, and retain your data, please review our separate{" "}
        <SCLink href="/privacy-policy">Privacy Policy</SCLink>. Contact us at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink> with any 
        questions about data protection.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Stellarcarbon strives to provide reliable services with reasonable skill and care, but we limit our 
        liability to ensure fairness, as permitted by Dutch law.
      </p>
      <p>
        <strong>Scope of Liability</strong>: To the maximum extent permitted by applicable law, 
        Stellarcarbon, its agents, and partners will not be liable for indirect, incidental, special, 
        consequential, or exemplary damages, including losses of profits, goodwill, or data, arising from 
        your use of our services, the Stellar Network, or third-party actions (e.g., Verra Registry, 
        validation/verification bodies).
      </p>
      <p>
        <strong>Liability Cap</strong>: Our aggregate liability for any claim under these ToU will not 
        exceed the amount you paid for the CARBON sinking transaction giving rise to the claim, except 
        where prohibited by Dutch or EU consumer law. This cap applies whether the claim arises in 
        contract, tort, or otherwise.
      </p>
      <p>
        <strong>Exclusions</strong>: We are not liable for damages caused by events beyond our reasonable 
        control, including Stellar Network failures, Verra integration issues, cybersecurity attacks, or 
        regulatory changes, provided we act with reasonable skill and care. Your sole remedy, if 
        dissatisfied, is to discontinue using our services.
      </p>
      <p>
        <strong>Consumer Protections</strong>: These limitations do not affect your unwaivable statutory 
        rights under Dutch or EU law, such as rights to remedies for non-performance of essential 
        obligations.
      </p>

      <h2>Termination and Suspension</h2>
      <p>
        Stellarcarbon may suspend or terminate your access to our services under specific conditions to 
        protect our platform, users, and compliance with applicable laws.
      </p>
      <p>
        <strong>Conditions</strong>: We may suspend or terminate your access if you violate these ToU 
        (e.g., engaging in greenwashing, providing inaccurate VAT disclosures), conduct fraudulent 
        activities, reside in a restricted jurisdiction, are subject to sanctions, or fail to update your 
        recipient registration information.
      </p>
      <p>
        <strong>Effect of Termination</strong>: Upon suspension or termination, your ability to sink 
        CARBON tokens or receive CarbonSINK tokens will cease. Pending retirements may be delayed or 
        canceled, and existing CarbonSINK balances may remain unaffected unless subject to clawback (see 
        Clawback Policy).
      </p>
      <p>
        <strong>Notice</strong>: We will notify you of suspension or termination via email or the dApp, 
        where feasible, explaining the reason and any steps to resolve the issue. Contact us at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink> for assistance.
      </p>

      <h2>Governing Law and Dispute Resolution</h2>
      <p>
        These ToU are governed by Dutch law, and we aim to resolve disputes fairly and directly with you.
      </p>
      <p>
        <strong>Governing Law</strong>: Your use of our services, as well as any dispute or claim arising
        out of, or in connection with it, is governed by Dutch law, without regard to conflict of law rules.
        For contracts with Dutch businesses or Dutch-resident consumers, we have designed these ToU to 
        comply with the <em>algemene voorwaarden</em> framework (Book 6, Title 5, Section 3, Articles 231–247 
        of the <em>Burgerlijk Wetboek</em>).
      </p>
      <p>
        <strong>Dispute Resolution</strong>: If a dispute arises, you must first contact Stellarcarbon at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink> to attempt 
        good-faith resolution. EU consumers may also access the EU Consumer Redress portal at{" "}
        <SCLink href="https://consumer-redress.ec.europa.eu" target="_blank">
          consumer-redress.ec.europa.eu
        </SCLink> as an optional alternative dispute resolution mechanism.
      </p>
      <p>
        <strong>Court Option</strong>: If a dispute remains unresolved, Stellarcarbon may, at its 
        discretion, pursue proceedings in the Gelderland District Court or a court in your jurisdiction, 
        ensuring enforceability. You agree to cooperate in resolving disputes efficiently.
      </p>

      <h2>Miscellaneous</h2>
      <p>
        These provisions address additional aspects of our agreement to ensure clarity and fairness.
      </p>
      <p>
        <strong>Statutory Rights</strong>: These ToU do not limit or exclude your unwaivable statutory 
        rights, especially as a consumer under Dutch or EU law, such as rights to remedies for 
        non-performance.
      </p>
      <p>
        <strong>Unaddressed Situations</strong>: For situations not covered by these ToU, we will weigh 
        your interests against ours and decide how to proceed, subject to Dutch law’s reasonableness 
        requirement. We may deviate from these ToU for security, legal, or compelling reasons.
      </p>
      <p>
        <strong>Force Majeure</strong>: Stellarcarbon is not liable for delays or failures due to events 
        beyond our reasonable control, such as Stellar Network outages, Verra Registry failures, or 
        regulatory changes.
      </p>
      <p>
        <strong>Severability</strong>: If a court finds any part of these ToU unenforceable, the remaining 
        provisions will stay in effect, and we will replace the unenforceable part with a similar, 
        enforceable term.
      </p>
      <p>
        <strong>No Waiver</strong>: Our failure to enforce any provision does not waive our right to do so 
        later. Your obligations remain in full force.
      </p>
      <p>
        <strong>No Assignment</strong>: You may not assign or transfer your rights under these ToU without 
        our consent. We may assign our rights to affiliates or successors, without affecting your consumer 
        rights.
      </p>
      <p>
        <strong>Entire Agreement</strong>: These ToU, including any referenced policies, constitute the 
        entire agreement between you and Stellarcarbon, superseding prior statements or agreements.
      </p>
      <p>
        <strong>Changes to Services or ToU</strong>: We may modify our services or ToU due to legal, 
        safety, technological, or developmental reasons, with notice via email, our website, or dApp.
      </p>

      <h2>Contact Information</h2>
      <p>
        For questions, support, or to report issues, please contact us at{" "}
        <SCLink href="mailto:support@stellarcarbon.io">support@stellarcarbon.io</SCLink>. Notices under 
        these ToU will be sent via email or the Stellarcarbon dApp. You are recommended but not required
        to provide us with your email address. If you fail to provide us with your email address, we will
        not be able to provide notices outside of the dApp.
      </p>
    </main>
  );
}
