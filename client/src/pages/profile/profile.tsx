import {
  SIGNOUT_AUTH_ROUTE,
  UPDATE_PROFILE,
  USER_AUTH_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import pictureDefault from "@/../public/defaultProfile.png";
import { toast } from "sonner";
import { ArrowLeft, Camera, LogOut, Save, User } from "lucide-react";

export default function ProfilePage() {
  const imgRef = useRef<HTMLInputElement>(null);
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [name, setName] = useState<string>(userInfo?.name as string);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }

    apiClient
      .get(USER_AUTH_ROUTE, { withCredentials: true })
      .then((res) => {
        setName(res.data?.name);
        setImageUrl(res.data?.profileImgUrl);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to get the profile data");
      });
  }, [userInfo, navigate]);

  const handleSignOut = () => {
    setUserInfo(undefined);
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => {
        console.log(err);
        toast.error("Logout failed");
      });
  };

  const updateProfile = () => {
    if (!name?.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    apiClient
      .post(
        UPDATE_PROFILE,
        { name, profileImgUrl: imageUrl },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Updated successfully");
        setUserInfo({
          ...userInfo!,
          email: res.data.email as string,
          name: res.data.name as string,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#deffff] via-[#f0f9ff] to-[#e0e7ff] p-4 font-sans">
      {!userInfo ? (
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl text-center animate-in fade-in zoom-in duration-300">
          <p className="text-xl font-medium text-gray-800 mb-4">Try to authenticate again</p>
          <Button onClick={() => navigate("/")}>Go to Login</Button>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] flex flex-col p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full hover:bg-white/50 text-gray-600"
            >
              <ArrowLeft size={24} />
            </Button>
            <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="rounded-full hover:bg-red-50 text-red-500"
            >
              <LogOut size={22} />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Profile Image Section */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => imgRef.current?.click()}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center relative">
                <img
                  src={imageUrl || pictureDefault}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                  <Camera size={28} className="mb-1" />
                  <span className="text-xs font-medium">Change Photo</span>
                </div>
              </div>

              {/* Floating Camera Button (Mobile) */}
              <div className="absolute bottom-1 right-1 bg-purple-600 p-2.5 rounded-full text-white shadow-lg border-2 border-white md:hidden">
                <Camera size={18} />
              </div>

              <Input
                ref={imgRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const files = e.target.files;
                  const file = files && files[0];
                  if (file) {
                    const fileURL = URL.createObjectURL(file);
                    setImageUrl(fileURL);
                  }
                }}
              />
            </div>

            {/* Form Section */}
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-500 ml-1">
                  Display Name
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <User size={18} />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="pl-12 h-12 bg-white/50 border-white/60 rounded-2xl focus:bg-white/80 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all text-gray-800"
                  />
                </div>
              </div>

              <Button
                onClick={updateProfile}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg shadow-purple-200 border-0 transition-all font-semibold flex items-center justify-center gap-2 group"
              >
                <Save size={18} className="group-hover:scale-110 transition-transform" />
                Update Profile
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Personalize your identity on the platform
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
