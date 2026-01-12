import CredentialsSignUpForm from "@/components/auth/credentials-sign-up-form";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Link } from "lucide-react";
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
          <Link>
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={50}
              height={50}
              priority
            >
          </Link>
          Vlad
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
