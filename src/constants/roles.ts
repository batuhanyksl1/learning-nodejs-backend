export const ROLES = {
    USER: "user",
    ADMIN: "admin"
} as const;


export type Role = (typeof ROLES)[keyof typeof ROLES]
/**
 export type Role = "user" | "admin"; anlamına gelir.
 */