import CredentialsSignUpForm from "@/components/auth/credentials-sign-up-form";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Sign up",
}

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <Link href="/" className="flex justify-center mt-10">
            <Image
              src="/logo.svg"
              alt={`${APP_NAME} logo`}
              width={50}
              height={50}
              priority
            />
          </Link>

          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Sign up for a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}
