import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const NavItems = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div className="flex gap-4 h-full items-center">
      <NavLink
        to="/"
        className={cn(
          "hover:text-primary",
          activeLink === "/" && "text-primary"
        )}
        onClick={() => handleSetActiveLink("/")}
      >
        Home
      </NavLink>
      <NavLink
        to="/food"
        className={cn(
          "hover:text-primary",
          activeLink === "/food" && "text-primary"
        )}
        onClick={() => handleSetActiveLink("/food")}
      >
        Food
      </NavLink>
      <NavLink
        to="/contact"
        className={cn(
          "hover:text-primary",
          activeLink === "/contact" && "text-primary"
        )}
        onClick={() => handleSetActiveLink("/contact")}
      >
        Contact
      </NavLink>
    </div>
  );
};

export default NavItems;
