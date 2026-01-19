'use client';

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  if (isPending) return <div className="p-8">Loading...</div>;

  if (!session) {
    return (
      <div className="p-8 space-x-4">
        <h1 className="mb-4 text-2xl font-bold">You are not Authorized</h1>
        <Button asChild variant="destructive">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild variant="default">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="bg-slate-100 p-4 rounded-lg">
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
      </div>
      <Button
        onClick={async () => await authClient.signOut()}
        className="mt-4"
      >
        Sign Out
      </Button>
    </div>
  );
}
