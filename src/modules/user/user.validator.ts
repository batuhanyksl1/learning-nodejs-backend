import { object, z } from "zod";
import { ROLES, Role } from "../../constants/roles";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    role: z.enum(Object.values(ROLES) as [string, ...string[]]),
  }),
});

export const getUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const updateUserRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    role: z.enum([ROLES.USER, ROLES.ADMIN] as const),
  }),
});

export const listUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    role: z.enum([ROLES.USER, ROLES.ADMIN]).optional(),
    search: z.string().min(1).optional(),
    sort: z.string().optional(),
  }),
});
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type GetUserInput = z.infer<typeof getUserSchema>["body"];
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>["body"];
export type ListUsersQuery = z.infer<typeof listUsersSchema>["query"];