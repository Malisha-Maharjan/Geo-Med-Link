import { z } from "zod";

export const createPostSchema = z.object({
  post: z.string({ invalid_type_error: "Must be string" }).nullable(),
  image: z.string({ invalid_type_error: "Must be string" }).nullable(),
});
