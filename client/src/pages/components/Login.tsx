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
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-gray-700 ml-1">Email</Label>
        <Input
          className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="m@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-gray-700 ml-1">Password</Label>
        <Input
          className="h-12 px-4 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*************"
        />
      </div>

      <Button
        onClick={() => handleLogin()}
        className="h-12 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-200 transition-all duration-300 hover:scale-[1.01]"
      >
        Sign In
      </Button>
    </div>
  );
}
