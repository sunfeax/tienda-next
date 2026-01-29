'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function CredentialsSignInForm({ callbackUrl = "/profile" } : { callbackUrl?: string }) {

  const [ error, setError ] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!email || !password) {
      toast.error("Fields with email and password cannot be empty")
      return;
    }

    const safeCallbackUrl =
      typeof callbackUrl === "string" && callbackUrl.startsWith("/")
        ? callbackUrl
        : "/profile";

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: safeCallbackUrl,
      },
      {
        onSuccess: () => {
          toast.success("Sign in was successful!");
          router.push(safeCallbackUrl);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ico@ico.com"
            defaultValue={signUpDeafaultValues.email}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="******"
          />
        </div>

        <div className="text-center text-sm text-slate-900">
          Don't have an account?
          <Link href="/sign-up" className="underline ml-2">
            Sign up
          </Link>
        </div>

        <Button 
          type="submit"
          className="mx-auto block bg-[#0f172a] hover:bg-[#1e293b] text-white px-7"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
