import { NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/stateStore";
import { authStateServices } from "@/reducers/authStateSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAxiosToken from "@/hooks/useAxiosToken";

interface UserAccountNavProps {
  username: string;
}

const UserAccountNav = (props: UserAccountNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const axiosClient = useAxiosToken();

  const logoutUser = async () => {
    try {
      await axiosClient.get("/auth/logout");
      dispatch(
        authStateServices.actions.setAuthState({
          user: null,
          accessToken: null,
        })
      );
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="lg">
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{props.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavLink to={"/cart"}>
          <DropdownMenuItem className="cursor-pointer">Cart</DropdownMenuItem>
        </NavLink>
        <NavLink to={"/orders"}>
          <DropdownMenuItem className="cursor-pointer">Order</DropdownMenuItem>
        </NavLink>
        <DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
