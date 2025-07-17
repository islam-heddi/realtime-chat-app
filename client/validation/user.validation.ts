import * as z from "zod";

export const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(4),
});
