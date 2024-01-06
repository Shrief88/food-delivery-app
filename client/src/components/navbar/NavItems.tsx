import NavItem from "./NavItem";

const NavItems = () => {
  
  return (
    <div className="flex gap-10 h-full items-center">
      <NavItem name="Home" link="/" />
      <NavItem name="Menu" link="/menu" />
    </div>
  );
};

export default NavItems;
