import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { UserLoginSchema } from "../../../validation/user.validation";
import { ZodError } from "zod";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
export default function Login() {
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    try {
      UserLoginSchema.parse({
        email,
        password,
      });
      apiClient
        .post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
        .then((res) => {
          setUserInfo(res.data);
          console.log(res.data);
          toast.success("login successful!");
          navigate("/dashboard");
        })
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
      <Label>Email</Label>
      <Input
        className="p-4 m-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="m@example.con"
      />

      <Label>Password</Label>
      <Input
        className="p-4 m-3"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="*************"
      />
      <Button onClick={() => handleLogin()} className="w-full">
        Submit
      </Button>
    </div>
  );
}
