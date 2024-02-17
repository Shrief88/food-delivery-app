import { NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";

import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import logo from "../../assets/images/logo.svg";
import NavItems from "./NavItems";
import { buttonVariants } from "../ui/button";
import Cart from "../cart/Cart";
import NavItem from "./NavItem";
import UserAccountNav from "./UserAccountNav";

import { useTypedSelector } from "@/stateStore";

const Navbar = () => {
  const user = useTypedSelector((state) => state.authState.user);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-green-200">
            <div className="flex py-4 items-center justify-between">
              <div className="flex items-center gap-32">
                <div className="ml-4 lg:ml-0 flex gap-3 items-center">
                  <NavLink to="/">
                    <img src={logo} alt="wasaly" className="w-20" />
                  </NavLink>
                  <p className="text-lg lg:text-xl">Wasaly</p>
                </div>
                <div className="hidden md:block md:self-stretch">
                  <NavItems />
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-1 items-center">
                  {user ? null : (
                    <NavItem
                      name="Login"
                      link="/login"
                      customStyle={buttonVariants({ variant: "ghost" })}
                    />
                  )}
                  {user && <UserAccountNav username={user.name} />}
                  <Separator orientation="vertical" />
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
