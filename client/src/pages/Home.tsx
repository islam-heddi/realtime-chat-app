import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./components/Register";
import Login from "./components/Login";
import pic from "../../public/login2.png";
import { Toaster } from "@/components/ui/sonner";
function Home() {
  return (
    <div className="h-[100vh] w-[100vw] inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="p-8 h-[80vh] w-[90vw] lg:w-[80vw] bg-white shadow-xl/30 flex flex-row justify-center items-center">
        <div className="w-[40vw] max-[1024px]:w-full">
          <h1 className="text-6xl font-semibold m-5 text-center">Chatty</h1>
          <Tabs defaultValue="login">
            <TabsList className="bg-white w-full">
              <TabsTrigger
                className="p-5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold w-full data-[state=active]:border-b-purple-800 transition-all duration-300 border-2 bg-white"
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                className="p-5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold w-full data-[state=active]:border-b-purple-800 transition-all duration-300 border-2 bg-white"
                value="register"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
        <div className="max-[1024px]:hidden">
          <img src={pic} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
