"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

const HomePage = () => {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Header />
      <h1>Dashboard Page</h1>
      <Button onClick={onOpen}>Add Account</Button>
    </div>
  );
};

export default HomePage;
