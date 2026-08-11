import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin, username } from "better-auth/plugins";

import prisma from "./database/dbClient";

import { ac, admin, student, teacher } from "./permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    username(),

    adminPlugin({
      ac,

      roles: {
        admin,
        student,
        teacher,
      },
    }),
  ],
});
