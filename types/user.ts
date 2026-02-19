export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  emailVerified: boolean;
  role: "user" | "admin";
  comms: "email" | "phone";
  createdAt: string;
  updatedAt: string;
};
