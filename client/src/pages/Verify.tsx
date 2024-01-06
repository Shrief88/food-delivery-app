import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import verify from "../assets/images/verify_email.jpg";
import { ShieldX } from "lucide-react";

import { verifyEmail } from "@/api/auth";
import { useAppDispatch } from "@/stateStore";
import { authStateServices } from "@/reducers/authStateSlice";
import useCheckToken from "@/hooks/useCheckToken";


const Verify = () => {
  useCheckToken();
  
  const { code } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await verifyEmail(code as string);
        dispatch(authStateServices.actions.setAuthState(response));
        setSuccess(true);
      } catch (err) {
        setSuccess(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [code]);
  return (
    <>
      {!loading && (
        <div className="flex flex-col items-center">
          {success && (
            <img
              src={verify}
              className="w-80 h-80 md:w-[600px]  md:h-[600px]"
            />
          )}
          {!success && (
            <ShieldX className="w-80 h-80 md:w-[400px] md:h-[400px] text-primary" />
          )}

          {success && (
            <NavLink to="/">
              <p className="text-blue-700 hover:underline">
                Your email has been Verified,Contiue to shopping
              </p>
            </NavLink>
          )}
          {!success && (
            <p className="text-red-600">Your email has not been Verified</p>
          )}
        </div>
      )}
    </>
  );
};

export default Verify;
