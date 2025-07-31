import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import SectionHeader from "@/components/SectionHeader";
import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { useAppContext } from "@/context/appContext";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import { useSCAccount } from "@/hooks/useSCAccount";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function OverviewContactInfo() {
  const { jwt, walletConnection } = useAppContext();
  const {
    showForm,
    setShowForm,
    showDeleteAccountDialog,
    setShowDeleteAccountDialog,
  } = useInlineContactInfoContext();

  const { deleteAccount } = useSCAccount();

  const router = useRouter();

  const onClickEdit = useCallback(() => {
    if (jwt) {
      setShowForm(true);
    } else {
      router.push("/sep10");
    }
  }, [jwt, router, setShowForm]);

  const onClickClose = useCallback(() => {
    setShowForm(false);
  }, [setShowForm]);

  const handleDelete = useCallback(() => {
    deleteAccount();
    setShowDeleteAccountDialog(false);
    setShowForm(false);
  }, [setShowDeleteAccountDialog, setShowForm, deleteAccount]);

  return (
    <div className="flex flex-col">
      <SectionHeader>
        <div>{showForm ? "Update registration" : "Registration details"}</div>

        {showForm ? (
          <div className="flex gap-2">
            <Button onClick={onClickClose} className="h-8 w-8">
              <FontAwesomeIcon icon={faXmark} className="text-base" />
            </Button>
          </div>
        ) : (
          <Button onClick={onClickEdit} className="h-8 text-base">
            <FontAwesomeIcon className="text-sm" icon={faEdit} />
            <div className="font-normal text-sm">Edit</div>
          </Button>
        )}
      </SectionHeader>

      <div className="p-3 md:p-6 md:py-3">
        {showForm ? (
          <ContactDetailsContextProvider mode="overview">
            <ContactDetailsForm />
          </ContactDetailsContextProvider>
        ) : (
          <div className="my-2">
            {!walletConnection?.recipient ? (
              <div className="text-center">
                This account is anonymous. No PDF certificates will be emailed.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <div>E-mail</div>
                    <div>{walletConnection.recipient.email}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="">Name</div>
                    <div className="">
                      {walletConnection.recipient.name ?? (
                        <div>Not specified</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {showDeleteAccountDialog && (
        <ConfirmDialog
          title="Delete registration"
          message="Are you sure you want to delete your Stellarcarbon registration?"
          onCancel={() => setShowDeleteAccountDialog(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
