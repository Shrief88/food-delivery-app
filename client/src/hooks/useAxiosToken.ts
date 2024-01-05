import { axiosClientWithToken } from "@/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useTypedSelector } from "@/stateStore";

const useAxiosToken = () => {
  const refresh = useRefreshToken();
  const accessToken = useTypedSelector((state) => state.authState.accessToken);

  useEffect(() => {
    const requestIntercept = axiosClientWithToken.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosClientWithToken.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosClientWithToken(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosClientWithToken.interceptors.response.eject(responseIntercept);
      axiosClientWithToken.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken, refresh]);

  return axiosClientWithToken;
};

export default useAxiosToken;
