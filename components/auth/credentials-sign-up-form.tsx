'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

export default function CredentialsSignUpForm() {
  
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Tienda Next";
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmedPassword = String(formData.get("password-confirmed"));
    const phone = String(formData.get("phone"));

    if (!name || !email || !password) return;

    if (password != confirmedPassword) {
      alert("Error: the passwords don't match.");
      return;
    }

    await authClient.signUp.email({
      name,
      email,
      password,
      phone,
    }, {
      onSuccess: () => {
        console.log("Registro correcto!");
        router.push("/sign-in");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            name="name"
            defaultValue={signUpDeafaultValues.name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="juan@example.com"
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
            placeholder="********"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-confirmed">Confirm password</Label>
          <Input
            id="password-confirmed"
            name="password-confirmed"
            type="password"
            placeholder="********"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="+34123456789"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Checkbox 
            id="terms" 
            className="h-5 w-5 border-2 border-slate-400 data-[state=checked]:border-primary" 
          />
          <p className="text-sm">I agree to the { }
            <Link href="/terms" className="underline underline-offset-2 hover:text-blue-950">terms and conditions</Link>
            { } of the {appName} store.
          </p>
        </div>

        <div className="text-center text-sm text-slate-600">
          Already have an account? 
          <Link href="/sign-in" className="text-slate-900 underline ml-2">
            Sign in
          </Link>
        </div>

        <Button type="submit" className="mx-auto block bg-[#1e293b] hover:bg-[#0f172a] text-white px-7">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
