import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CatogoryProps {
  name: string;
  icon: LucideIcon | string;
}

const Category = (props: CatogoryProps) => {
  return (
    <Link
      to={{
        pathname: "/menu",
        search: `?category=${props.name.toLowerCase()}`,
      }}
    >
      <div className="flex bg-secondary items-center gap-2 py-5 w-full hover:animate-accordion-up [&:not(:hover)]:animate-accordion-down">
        <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-full flex justify-center items-center">
            {typeof props.icon === "string" ? (
              <img src={props.icon} className="w-7 text-white" />
            ) : (
              <props.icon className="text-white w-7" />
            )}
          </div>
        </div>

        <p>{props.name}</p>
      </div>
    </Link>
  );
};

export default Category;
