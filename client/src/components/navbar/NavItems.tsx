import NavItem from "./NavItem";

const NavItems = () => {
  
  return (
    <div className="flex gap-4 h-full items-center">
      <NavItem name="Home" link="/" />
      <NavItem name="Food" link="/food" />
      <NavItem name="Checkout" link="/checkout" />
      <NavItem name="Contact" link="/contact" />
    </div>
  );
};

export default NavItems;
