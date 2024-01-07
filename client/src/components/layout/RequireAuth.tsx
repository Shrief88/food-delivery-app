import { useTypedSelector } from "@/stateStore";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const user = useTypedSelector((state) => state.authState.user);
  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
