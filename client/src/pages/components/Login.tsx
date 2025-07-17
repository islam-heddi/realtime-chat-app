import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="p-5">
      <Label>Email</Label>
      <Input className="p-4 m-3" type="email" placeholder="m@example.con" />

      <Label>Password</Label>
      <Input className="p-4 m-3" type="password" placeholder="*************" />
      <Button className="w-full">Submit</Button>
    </div>
  );
}
