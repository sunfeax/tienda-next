"use client";

import MainLoading from "@/app/loading";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export default function ToggleSignButton() {
  const router = useRouter();
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  const name = session?.user.name;

  if (isPending) return <MainLoading/>;

  if (session) {
    return (
      <div className="flex items-center justify-center gap-2.5">
        <Link href={"/profile"}>
          <div className="flex">
            <UserIcon></UserIcon>
            {name}
          </div>
        </Link>
        <Button
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/")
              }
            })
          }}
          variant={"outline"}
        >
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button asChild variant={'ghost'}>
        <Link href={'/sign-in'}>
            <UserIcon />
            Login
        </Link>
    </Button>
  )
}
