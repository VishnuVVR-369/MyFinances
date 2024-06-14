"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/newAccountSheet";
import { EditAccountSheet } from "@/features/accounts/components/editAccountSheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
