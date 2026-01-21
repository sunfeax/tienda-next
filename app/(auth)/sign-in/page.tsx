import CredentialsSignInForm from "@/components/auth/credentials-sign-in-form";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Sign in",
}

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <Link href="/" className="flex justify-center mt-5">
            <Image
              src="/logo.svg"
              alt={`${APP_NAME} logo`}
              width={50}
              height={50}
              priority
            />
          </Link>

          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
