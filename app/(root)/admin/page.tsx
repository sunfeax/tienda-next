import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <div className="p-8 space-x-4">
        <h1 className="mb-4 text-2xl font-bold">You are not authorized</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <h1 className="text-2xl font-bold">Admin Page</h1>
    </div>
  );
}
