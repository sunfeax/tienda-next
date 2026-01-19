'use client';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";

export default function CredentialsSignInForm() {
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
        callbackURL: "/", // redirect URL
      },
      {
        onSuccess: () => {
          console.log("Login correcto!");
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

        <Button
          type="submit"
          className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-6 mt-4"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
