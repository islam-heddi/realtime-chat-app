import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { UserSchema } from "../../../validation/user.validation";
import { ZodError } from "zod";
import { apiClient } from "@/lib/api-client";
import { REGISTER_ROUTE } from "@/utils/constants";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    try {
      UserSchema.parse({
        email,
        password,
        name,
      });

      apiClient
        .post(
          REGISTER_ROUTE,
          { email, password, name },
          { withCredentials: true }
        )
        .then(() => toast.success("Register successful!"))
        .catch((err) => {
          console.log(err);
          toast.error("error : " + err.response.data);
        });
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          toast.error(`${issue.path.join(".")}: ${issue.message}`);
        });
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div className="p-5">
      <Label>Username</Label>
      <Input
        className="p-4 m-3"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="enter your username"
      />
      <Label>Email</Label>
      <Input
        className="p-4 m-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="m@example.com"
      />
      <Label>Password</Label>
      <Input
        className="p-4 m-3"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="***********"
      />
      <Button onClick={() => handleSubmit()} className="w-full">
        Submit
      </Button>
      <Button
        className="w-full mt-4"
        onClick={() => {
          setName("");
          setEmail("");
          setPassword("");
        }}
      >
        Reset
      </Button>
    </div>
  );
}
