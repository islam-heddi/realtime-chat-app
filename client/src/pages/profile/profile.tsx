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
import { useEffect, useState } from "react";
import pictureDefault from "@/../public/defaultProfile.png";
import { toast } from "sonner";

export default function ProfilePage() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [name, setName] = useState<string>(userInfo?.name as string);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    apiClient
      .get(USER_AUTH_ROUTE, { withCredentials: true })
      .then((res) => {
        setName(res.data?.name);
        setImageUrl(res.data?.profileImgUrl);
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed to get the profile data");
      });
  }, []);

  const handleSignOut = () => {
    setUserInfo(undefined);
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const updateProfile = () => {
    if (name == "") {
      toast.error("name is empty");
      return;
    }

    apiClient
      .post(
        UPDATE_PROFILE,
        { name, profileImgUrl: imageUrl },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Updated successfully");
        setUserInfo({
          _id: userInfo?._id as string,
          email: userInfo?.email as string,
          name: userInfo?.name as string,
          image: userInfo?.image,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed to update");
      });
  };

  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      {userInfo == null ? (
        <>Try to authenticate again</>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
          <div className="flex flex-wrap flex-row items-center justify-between">
            <p
              className="text-red-800 cursor-pointer inline p-4"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </p>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </div>
          <div>{userInfo.name} Dashboard</div>
          <div className="flex flex-row items-center">
            <div
              className={`relative`}
              onMouseEnter={() => setUpdate(true)}
              onMouseLeave={() => setUpdate(false)}
            >
              <img
                width={225}
                height={225}
                src={imageUrl == "" ? pictureDefault : imageUrl}
                alt="profile picture"
              />
              <div
                className={`${
                  update ? "block" : "hidden"
                } absolute p-4 top-[30%] w-[200px] text-center`}
              >
                <p>Update a picture</p>
                <Input type="file" accept="image/png, image/jpeg" />
              </div>
            </div>
            <div className="m-5">
              <Label>Your name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="change your name"
              />
            </div>
            <Button onClick={() => updateProfile()} className="m-5">
              Change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
