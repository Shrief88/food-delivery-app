import { refreshAccessToken } from "@/api/auth";
import { useAppDispatch } from "@/stateStore";
import { authStateServices } from "@/reducers/authStateSlice";

const useRefreshToken = () => {
  const dispath = useAppDispatch();

  const refresh = async () => {
    try{
      const response = await refreshAccessToken();
      dispath(authStateServices.actions.setAuthState(response));
      return response.accessToken;
    }catch(err){
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
