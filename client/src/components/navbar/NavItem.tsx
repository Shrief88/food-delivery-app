import { cn } from "@/lib/utils";
import { activeNavItemServices } from "@/reducers/activeNavItemSlice";
import { useAppDispatch, useTypedSelector } from "@/stateStore";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  name: string;
  link: string;
  customStyle?: string;
}

const NavItem = (props: NavItemProps) => {
  const dispatch = useAppDispatch();
  const currentActiveNavItem = useTypedSelector(
    (state) => state.activeNavItem.activeNavItem
  );
  return (
    <NavLink
      to={props.link}
      className={cn(
        "hover:text-primary",
        props.customStyle,
        currentActiveNavItem === props.link && "text-primary"
      )}
      onClick={() =>
        dispatch(activeNavItemServices.actions.SetActiveNavItem(props.link))
      }
    >
      {props.name}
    </NavLink>
  );
};

export default NavItem;
