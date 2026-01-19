"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type SignOutButtonProps = {
  children?: ReactNode;
};

export default function SignOutButton({ children }: SignOutButtonProps) {
  return (
    <Button onClick={() => authClient.signOut()}>
      {children ?? "Sign out"}
    </Button>
  );
}
