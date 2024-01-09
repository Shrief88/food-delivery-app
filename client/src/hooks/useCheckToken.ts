import { useTypedSelector } from "@/stateStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckToken = () => {
  const navigate = useNavigate();
  const token = useTypedSelector((state) => state.authState.accessToken);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
};

export default useCheckToken;
