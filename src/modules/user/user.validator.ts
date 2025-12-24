import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),    
  }),
});

export const getUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type GetUserInput = z.infer<typeof getUserSchema>["body"];
