import { useEffect, useState } from "react";
import verify from "../assets/images/verify_email.jpg";
import { NavLink, useParams } from "react-router-dom";
import { verifyEmail } from "@/data";
import { ShieldX } from "lucide-react";

const Verify = () => {
  const { code } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await verifyEmail(code as string);
        setSuccess(true);
      } catch (err) {
        
        setSuccess(false);
        console.log(err);
      }
      setLoading(false)
    };
    fetchData();
  },[code]);
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
            <p className="text-red-600">
              Your email has not been Verified
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Verify;

