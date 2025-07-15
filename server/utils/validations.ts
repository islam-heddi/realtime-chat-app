import * as z from "zod";

export const UserValidation = z.object({
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(8),
});
