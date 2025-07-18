/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_AUTH_ROUTE, SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const get = async () => {
      const temp = await apiClient.get(USER_AUTH_ROUTE, {
        withCredentials: true,
      });
      setUser(temp.data);
    };
    get();
  }, []);

  const handleSignOut = () => {
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-[100vh] w-[100vw] inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      {user == null ? (
        <>Try to authenticate again</>
      ) : (
        <div className="bg-white p-6 rounded-2xl">
          <p
            className="text-red-800 cursor-pointer inline p-4"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </p>
          <p>name : {user.name}</p>
          <p>email : {user.email}</p>
        </div>
      )}
    </div>
  );
}
