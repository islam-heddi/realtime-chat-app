import { SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import FriendRequestComponent from "./components/FriendRequestComponent";
export default function FriendRequestPage() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUserInfo(undefined);
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
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
          <FriendRequestComponent />
        </div>
      )}
    </div>
  );
}
