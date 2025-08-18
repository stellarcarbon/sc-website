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
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="text-lg md:text-xl font-semibold">Account registration</h2>
      <span className="text-center">
        To receive a personal certificates, we have to register your contact
        details with Stellarcarbon.
      </span>

      <form className="flex-1 flex flex-col justify-center gap-2 items-center w-full">
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
    </div>
  );
}
