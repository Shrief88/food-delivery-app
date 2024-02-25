import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PersisttentLogin = () => {
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    verifyRefreshToken();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersisttentLogin;
