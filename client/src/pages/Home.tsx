import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./components/Register";
import Login from "./components/Login";
import pic from "/Illustration.png?url";
import { Toaster } from "@/components/ui/sonner";
function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#deffff] via-[#f0f9ff] to-[#e0e7ff] p-4 sm:p-6 md:p-10 font-sans">
      <div className="relative overflow-hidden w-full max-w-[1200px] min-h-[600px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl flex flex-col lg:flex-row items-center justify-center p-8 lg:p-12">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl -z-10" />

        <div className="w-full lg:w-1/2 flex flex-col gap-8 z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 mb-2">
              Chatty
            </h1>
            <p className="text-gray-500 text-lg font-medium">Connect with friends instantly.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 p-1 rounded-xl mb-6">
              <TabsTrigger
                className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 font-medium"
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 font-medium"
                value="register"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="login" className="focus-visible:outline-none">
                <Login />
              </TabsContent>
              <TabsContent value="register" className="focus-visible:outline-none">
                <Register />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img src={pic} alt="Illustration" className="relative rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
