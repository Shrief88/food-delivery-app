import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const PersisttentLogin = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      }
    };

    verifyRefreshToken();
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default PersisttentLogin;
