import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import MessageBox from "@/components/MessageBox";
import SectionHeader from "@/components/SectionHeader";
import ContactDetailsForm from "@/containers/ContactDetailsForm";
import { useAppContext } from "@/context/appContext";
import { ContactDetailsContextProvider } from "@/context/ContactDetailsContext";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import { useSCAccount } from "@/hooks/useSCAccount";
import {
  faCircleCheck,
  faContactCard,
  faEdit,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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

  const { deleteAccount, isStale, updateAccount } = useSCAccount();

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

  const onClickConfirmRegistration = useCallback(() => {
    updateAccount(
      walletConnection!.recipient!.email,
      walletConnection?.recipient?.name ?? undefined
    );
  }, [walletConnection, updateAccount]);

  const handleDelete = useCallback(() => {
    deleteAccount();
    setShowDeleteAccountDialog(false);
    setShowForm(false);
  }, [setShowDeleteAccountDialog, setShowForm, deleteAccount]);

  return (
    <div className="flex flex-col">
      <SectionHeader icon={faContactCard}>
        <div>{showForm ? "Update registration" : "Registration details"}</div>

        {showForm ? (
          <div className="flex-1 flex justify-end">
            <Button onClick={onClickClose} className="h-8 w-8">
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex justify-end">
            <Button onClick={onClickEdit} className="h-8 text-base">
              <FontAwesomeIcon className="text-sm" icon={faEdit} />
              <div className="font-normal text-sm">Edit</div>
            </Button>
          </div>
        )}
      </SectionHeader>

      <div className="p-3 md:p-6 md:py-3">
        {showForm ? (
          <ContactDetailsContextProvider mode="overview">
            <div className="mb-2">
              <ContactDetailsForm />
            </div>
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
                        <div className="text-tertiary italic">
                          Not specified
                        </div>
                      )}
                    </div>
                  </div>
                  {isStale && (
                    <MessageBox>
                      <div className="text-center mb-4 text-sm">
                        {`Is this still the email address where you'd like to
                        receive your retirement certificates?`}
                      </div>
                      <div className="flex justify-between">
                        <Button
                          onClick={onClickConfirmRegistration}
                          className="h-8 text-sm"
                        >
                          <FontAwesomeIcon icon={faCircleCheck} />
                          Confirm registration
                        </Button>
                        <Button onClick={onClickEdit} className="h-8 text-sm">
                          <FontAwesomeIcon icon={faEdit} />
                          <div className="font-normal">Edit registration</div>
                        </Button>
                      </div>
                    </MessageBox>
                  )}
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
