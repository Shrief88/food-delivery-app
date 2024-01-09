import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersisttentLogin = () => {
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    verifyRefreshToken();
    
  }, [refresh]);

  return (
    <>
      {loading ? null : <Outlet />}
    </>
  );
};

export default PersisttentLogin;
