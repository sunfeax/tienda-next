import Link from "next/link";
import { headers } from "next/headers";
import UsersTable from "@/components/admin/users-table";
import { Button } from "@/components/ui/button";
import { getUsersTable } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold">You are not authorized</h1>
      </div>
    );
  }

  const users = await getUsersTable();

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Users</h1>
        <Button asChild variant="outline">
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>
      <UsersTable users={users} />
    </div>
  );
}
