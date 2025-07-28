"use client";

import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";

export default function ContactDetailsPage() {
  return (
    <ContactDetailsContextProvider>
      <ContactDetailsForm />
    </ContactDetailsContextProvider>
  );
}
