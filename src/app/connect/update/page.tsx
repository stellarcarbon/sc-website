"use client";

import SectionHeader from "@/components/SectionHeader";
import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";

export default function UpdateAccountPage() {
  return (
    <ContactDetailsContextProvider mode="update">
      <SectionHeader>
        <div className="text-center text-2xl w-full">
          Confirm contact details
        </div>
      </SectionHeader>
      <div className="p-3 py-6 pb-12 md:p-6 flex flex-col">
        <div>
          {`Your account wasn't updated for a while. Please confirm your contact
          details.`}
        </div>
        <ContactDetailsForm />
      </div>
    </ContactDetailsContextProvider>
  );
}
