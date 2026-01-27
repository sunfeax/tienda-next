"use client";

import MainLoading from "@/app/loading";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export default function ProfileStateButton() {
  const router = useRouter();
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  const name = session?.user.name;

  if (isPending) return <MainLoading/>;

  if (session) {
    return (
      <div className="inline-flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/profile">
            <UserIcon className="size-4" />
            {name}
          </Link>
        </Button>

        <Button
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/")
              }
            });
          }}
          variant="outline"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button asChild variant={'ghost'}>
        <Link href={'/sign-in'}>
            <UserIcon />
            Sign in
        </Link>
    </Button>
  )
}
