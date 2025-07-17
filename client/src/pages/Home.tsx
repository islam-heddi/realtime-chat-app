import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./components/Register";
import Login from "./components/Login";
function Home() {
  return (
    <div>
      <h1 className="text-2xl">Chat App</h1>
      <Tabs>
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>

        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
