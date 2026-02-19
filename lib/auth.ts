import { prisma } from '@/db/prisma';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true
      },
      comms: {
        type: "string",
        required: true,
        defaultValue: "email",
        input: true
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false
      }
    }
  }
});
