import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="p-5">
      <Label>Email</Label>
      <Input type="email" placeholder="m@example.con" />

      <Label>Password</Label>
      <Input type="password" placeholder="*************" />
      <Button>Submit</Button>
    </div>
  );
}
