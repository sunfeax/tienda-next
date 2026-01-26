"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type SignOutButtonProps = {
  children?: ReactNode;
};

export default function SignOutButton({ children }: SignOutButtonProps) {
  const router = useRouter();

  return (
    <Button onClick={() => authClient.signOut()}>
      {children ?? "Sign out"}
    </Button>
  );
}
