import * as z from "zod";

const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(4),
});

const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export { UserLoginSchema, UserSchema };
