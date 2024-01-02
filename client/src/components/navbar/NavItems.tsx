import NavItem from "./NavItem";

const NavItems = () => {
  
  return (
    <div className="flex gap-4 h-full items-center">
      <NavItem name="Home" link="/" />
      <NavItem name="Menu" link="/menu" />
      <NavItem name="Checkout" link="/checkout" />
      <NavItem name="Contact" link="/contact" />
    </div>
  );
};

export default NavItems;
