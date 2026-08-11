import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,

  student: ["read", "create", "update", "delete"],
  teacher: ["read", "create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,

  student: ["read", "create", "update", "delete"],
  teacher: ["read", "create", "update", "delete"],
});

export const student = ac.newRole({
  student: ["read"],
});

export const teacher = ac.newRole({
  teacher: ["read"],
});
