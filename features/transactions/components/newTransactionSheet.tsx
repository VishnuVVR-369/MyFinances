import { Loader2 } from "lucide-react";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction";
import { useCreateTransaction } from "@/features/transactions/api/useCreateTransaction";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import { TransactionForm } from "@/features/transactions/components/transactionForm";

const fromSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof fromSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const isPending =
    createMutation.isPending ||
    accountMutation.isPending ||
    categoryMutation.isPending;
  const isLoading = accountQuery.isLoading || categoryQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
