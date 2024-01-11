import { useAppDispatch } from "@/stateStore";
import { authStateServices } from "@/reducers/authStateSlice";
import { LoginResponse } from "@/model";
import { axiosClient } from "@/api/axios";

const useRefreshToken = () => {
  const dispath = useAppDispatch();

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;
      const response: LoginResponse = (await axiosClient.get("/auth/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })).data;
      dispath(authStateServices.actions.setAuthState(response));
      return response.accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
