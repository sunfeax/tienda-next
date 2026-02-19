'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import { adminUpdateUserSchema } from "@/lib/validators";
import { AdminUser } from "@/types/user";

function normalizeRole(role: string): AdminUser["role"] {
  return role === "admin" ? "admin" : "user";
}

function normalizeComms(comms: string): AdminUser["comms"] {
  return comms === "phone" ? "phone" : "email";
}

export async function getUsersTable(): Promise<AdminUser[]> {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      emailVerified: true,
      role: true,
      comms: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return data.map((user) => ({
    ...user,
    role: normalizeRole(user.role),
    comms: normalizeComms(user.comms),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
}

export async function updateUserByAdmin(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const parsed = adminUpdateUserSchema.safeParse({
    id: String(formData.get("id") ?? ""),
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    role: String(formData.get("role") ?? ""),
    comms: String(formData.get("comms") ?? ""),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid user data";
    throw new Error(message);
  }

  const { id, name, phone, role, comms } = parsed.data;

  await prisma.user.update({
    where: { id },
    data: {
      name,
      phone: phone ?? null,
      role,
      comms,
    },
  });

  revalidatePath("/admin/users");
}
