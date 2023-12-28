import { cn } from "@/lib/utils";
import { activeNavItemServices } from "@/reducers/activeNavItemSlice";
import { useAppDispatch, useTypedSelector } from "@/stateStore";
import { NavLink } from "react-router-dom";

const NavItems = () => {
  const dispatch = useAppDispatch();
  const currentActiveNavItem = useTypedSelector(
    (state) => state.activeNavItem.activeNavItem
  );

  return (
    <div className="flex gap-4 h-full items-center">
      <NavLink
        to="/"
        className={cn(
          "hover:text-primary",
          currentActiveNavItem === "/" && "text-primary"
        )}
        onClick={() =>
          dispatch(activeNavItemServices.actions.SetActiveNavItem("/"))
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/food"
        className={cn(
          "hover:text-primary",
          currentActiveNavItem === "/food" && "text-primary"
        )}
        onClick={() =>
          dispatch(activeNavItemServices.actions.SetActiveNavItem("/food"))
        }
      >
        Food
      </NavLink>
      <NavLink
        to="/checkout"
        className={cn(
          "hover:text-primary",
          currentActiveNavItem === "/checkout" && "text-primary"
        )}
        onClick={() =>
          dispatch(activeNavItemServices.actions.SetActiveNavItem("/checkout"))
        }
      >
        Checkout
      </NavLink>
      <NavLink
        to="/contact"
        className={cn(
          "hover:text-primary",
          currentActiveNavItem === "/contact" && "text-primary"
        )}
        onClick={() =>
          dispatch(activeNavItemServices.actions.SetActiveNavItem("/contact"))
        }
      >
        Contact
      </NavLink>
    </div>
  );
};

export default NavItems;
