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

export const DonorSchema = z.object({
  blood_Group: z
    .string({ invalid_type_error: "Must be a string" })
    .regex(/^(A|B|AB|O)[+-]$/, "Invalid Blood Group"),
});

export const loginSchema = z.object({
  userName: z.string({ invalid_type_error: "Must be a string" }),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/, "Password is invalid"),
});

export const userNameSchema = z.object({
  userName: z.string({ invalid_type_error: "Must be a string" }),
});
