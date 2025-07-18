import { SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

export default function Dashboard() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-[100vh] w-[100vw] inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      {userInfo == null ? (
        <>Try to authenticate again</>
      ) : (
        <div className="bg-white p-6 rounded-2xl">
          <p
            className="text-red-800 cursor-pointer inline p-4"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </p>
          <p>name : {userInfo?.name}</p>
          <p>email : {userInfo?.email}</p>
        </div>
      )}
    </div>
  );
}
