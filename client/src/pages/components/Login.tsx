import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      <Button className="w-full">Submit</Button>
    </div>
  );
}
