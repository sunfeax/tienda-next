'use client';

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/auth/signout-button";
import MainLoading from "@/app/loading";

export default function ProfilePage() {
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  if (isPending) return <MainLoading/>;

  if (!session) {
    return (
      <div className="p-8 space-x-4">
        <h1 className="mb-4 text-2xl font-bold">You are not authorized</h1>
        <Button asChild variant="destructive">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild variant="default">
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <div className="bg-slate-100 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div className="w-10">
        <SignOutButton>Sign out</SignOutButton>
      </div>
    </div>
  );
}
