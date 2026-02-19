'use client';

import { updateUserByAdmin } from "@/lib/actions/user.actions";
import { AdminUser } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersTable({ users }: { users: AdminUser[] }) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await updateUserByAdmin(formData);
        toast.success("User updated successfully");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update user";
        toast.error(message);
      }
    });
  }

  return (
    <Table>
      <TableCaption>Users management</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Comms</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Changed</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const rowFormId = `update-user-${user.id}`;

          return (
            <TableRow key={user.id}>
              <TableCell>
                <Input
                  form={rowFormId}
                  name="name"
                  defaultValue={user.name}
                  className="min-w-44"
                />
              </TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Input
                  form={rowFormId}
                  name="phone"
                  defaultValue={user.phone ?? ""}
                  className="min-w-36"
                />
              </TableCell>
              <TableCell>
                <select
                  form={rowFormId}
                  name="role"
                  defaultValue={user.role}
                  className="h-9 rounded-md border bg-transparent px-3 text-sm"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </TableCell>
              <TableCell>
                <select
                  form={rowFormId}
                  name="comms"
                  defaultValue={user.comms}
                  className="h-9 rounded-md border bg-transparent px-3 text-sm"
                >
                  <option value="email">email</option>
                  <option value="phone">phone</option>
                </select>
              </TableCell>
              <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(user.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <form id={rowFormId} onSubmit={handleSubmit} className="inline-flex items-center gap-2">
                  <input type="hidden" name="id" value={user.id} />
                  <Button type="submit" size="sm" disabled={isPending}>
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
