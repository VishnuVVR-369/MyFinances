import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome OnBoard</h1>
          <p className="text-base text-[#7E8CA0]">
            LogIn or SignUp to get back to your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoading>
            <Loader2 className="animate-spin text-[#2E2A47]" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
        </div>
      </div>
      <div className="h-full bg-slate-200 hidden lg:flex items-center justify-center">
        {/* TODO: Make the design look better */}
        <Image src="./logo.svg" alt="logo" height={150} width={150} />
      </div>
    </div>
  );
}
