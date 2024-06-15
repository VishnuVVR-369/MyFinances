import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";
import { AccountForm } from "@/features/accounts/components/accountForm";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { useEditAccount } from "@/features/accounts/api/useEditAccount";
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import { useConfirm } from "@/hooks/useConfirm";

const fromSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof fromSchema>;

export const EditAccountSheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete the account. This action cannot be undone."
  );
  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  const isLoading = accountQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit your existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
