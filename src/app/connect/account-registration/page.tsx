"use client";

import SectionHeader from "@/components/SectionHeader";
import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";

export default function ContactDetailsPage() {
  return (
    <ContactDetailsContextProvider mode="create">
      <SectionHeader>
        <div className="text-center text-2xl w-full">Account registration</div>
      </SectionHeader>
      <div className="p-3 py-6 pb-12 md:p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            Register your Stellar account with Stellarcarbon by filling in your
            contact details below.
          </div>
          <div className="text-sm bg-secondary border border-accentSecondary rounded p-3 text-center mx-2">
            Adding your email address will allow you to receive personal
            certificates for eligible contributions. This is recommended, but
            you are able to continue without sharing your contact details.
          </div>
        </div>

        <ContactDetailsForm />
      </div>
    </ContactDetailsContextProvider>
  );
}
