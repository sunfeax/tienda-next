'use client';

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/lib/validators";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function CredentialsSignUpForm() {

  const [contactOption, setContactOption] = useState<'email' | 'phone'>('email');
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Tienda Next";
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();

    const raw = Object.fromEntries(new FormData(evt.currentTarget)) as Record<string, string>;

    const payload = {
      name: raw.name ?? '',
      email: raw.email ?? '',
      password: raw.password ?? '',
      confirmPassword: raw.confirmPassword ?? '',
      phone: raw.phone ?? '',
      contactOption: raw.contactOption ?? 'email',
      terms: raw.terms === 'on',
    };

    const parsed = signUpSchema.safeParse(payload);

    if (!parsed.success) {
      const { fieldErrors, formErrors } = z.flattenError(parsed.error);
      const messages = [
        ...formErrors,
        ...Object.values(fieldErrors).flat(),
      ].filter(Boolean);

      toast.error("", {
        description: messages.join("\n"),
        descriptionClassName: "whitespace-pre-line",
      });

      return;
    }

    const { name, email, password, phone } = parsed.data;

    await authClient.signUp.email({name, email, password, phone}, {
      onSuccess: () => {
        toast.success("Registration was successful!");
        router.push("/sign-in");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="34 123 456 789"
          />
        </div>

        <div>
          <p className="text-sm mt-2.5 mb-2.5">How to contact with you?</p>
          <RadioGroup
            defaultValue="email"
            name="contactOption"
            value={contactOption}
            onValueChange={(val) => setContactOption(val as 'email')}
            className="flex gap-10">
            <div className="inline-flex items-left gap-2">
              <RadioGroupItem value="email" id="r1"></RadioGroupItem>
              <Label>Email</Label>
            </div>
            <div className="inline-flex items-center gap-2">
              <RadioGroupItem value="phone" id="r2"></RadioGroupItem>
              <Label>Phone number</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            name="terms"
            className="mt-1 h-5 w-5 border-2 border-slate-400 data-[state=checked]:border-primary"
          />
          <div>
            <p className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-blue-950">
                terms and conditions
              </Link>{" "}
              of the {appName} store.
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-slate-900">
          Already have an account?
          <Link href="/sign-in" className="underline ml-2">
            Sign in
          </Link>
        </div>

        <Button type="submit" className="mx-auto block bg-[#0f172a] hover:bg-[#1e293b] text-white px-7">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
