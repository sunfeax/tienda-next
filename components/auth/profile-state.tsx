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
      <div className="inline-flex items-center justify-center px-2 whitespace-nowrap rounded-md transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50">
        <Link href={"/profile"}>
          <div className="flex items-center gap-2 [&_svg]:size-4">
            <UserIcon />
            {name}
          </div>
        </Link>
        <Button
          asChild
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
