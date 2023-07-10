import { z } from "zod";

export const createUserSchema = z.object({
  userName: z.string({ invalid_type_error: "Must be a string" }),
  firstName: z.string({ invalid_type_error: "Must be a string" }),
  middleName: z.string({ invalid_type_error: "Must be a string" }).nullable(),
  address: z.string({ invalid_type_error: "Last name must be a string" }),
  email: z
    .string({ invalid_type_error: "Must be a string" })
    .email("Invalid email pattern"),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/, "Password is invalid"),
  lastName: z.string({ invalid_type_error: "Must be a string" }),
});
