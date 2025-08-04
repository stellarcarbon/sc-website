import ConfirmDialog from "@/components/ConfirmDialog";
import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import { useSCAccount } from "@/hooks/useSCAccount";
import { useCallback } from "react";

export default function RequestCertificateContactDetailsForm() {
  const { showDeleteAccountDialog, setShowDeleteAccountDialog } =
    useInlineContactInfoContext();

  const { deleteAccount } = useSCAccount();

  const handleDelete = useCallback(() => {
    deleteAccount();
    setShowDeleteAccountDialog(false);
  }, [deleteAccount, setShowDeleteAccountDialog]);

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold">Account registration</h2>
      <span className="text-center">
        You need to register your Stellar wallet to receive personal
        certificates.
      </span>

      <form className="flex-1 flex flex-col justify-center gap-2 items-center w-full">
        <span className="text-center">
          Add your contact information to create a personal certificate.
        </span>
        <div className="w-full">
          <ContactDetailsContextProvider mode="rounddown">
            <ContactDetailsForm />
          </ContactDetailsContextProvider>
        </div>
      </form>

      {showDeleteAccountDialog && (
        <ConfirmDialog
          title="Delete item"
          message="Are you sure you want to delete this? This action cannot be undone."
          onCancel={() => setShowDeleteAccountDialog(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
