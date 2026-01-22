'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CredentialsSignInForm() {

  const router = useRouter();
  
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();
    
    const formData = new FormData(evt.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!email || !password) return;

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          console.log("Login correcto!");
          router.push("/profile");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
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
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="******"
            required
          />
        </div>

        <div className="text-center text-sm text-slate-600">
          Don't have an account?
          <Link href="/sign-up" className="text-slate-900 underline ml-2">
            Sign up
          </Link>
        </div>

        <Button
          type="submit"
          className="mx-auto block bg-[#1e293b] hover:bg-[#0f172a] text-white px-7"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
