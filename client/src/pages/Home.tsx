import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  ChevronRight,
  ShieldCheck,
  CarFront,
  Pizza,
  Beef,
  Soup,
} from "lucide-react";

import MaxWidthWrapper from "../components/MaxWidthWrapper";
import deliveryGuy from "../assets/images/hero.png";
import fastFood from "../assets/images/fastfood.svg";
import Category from "../components/ui/Category";

const Home = () => {
  return (
    <div className="py-20 mx-auto text-center flex flex-col items-center ">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-10">
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-2">
              <p className="text-lg sm:2xl tracking-tight">
                Easy way to make an order
              </p>
              <h1 className="text-4xl tracking-tight sm:text-5xl">
                <span className="text-primary">HUNGRY?</span> Just wait
              </h1>
              <h1 className="text-4xl tracking-tight sm:text-5xl">
                food at <span className="text-primary">your door</span>
              </h1>
            </div>
            <div>
              <p className="text-muted-foreground max-w-prose  mt-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                magni delectus tenetur autem, sint veritatis!
              </p>
            </div>
            <div className="flex gap-10 mt-10 justify-center">
              <NavLink className={buttonVariants()} to={"/checkout"}>
                Order now {<ChevronRight />}
              </NavLink>
              <NavLink
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-primary"
                )}
                to={"/food"}
              >
                See all foods
              </NavLink>
            </div>
            <div className="flex gap-10 mt-10 justify-center ">
              <div className="flex gap-4 justify-center items-center">
                <div className="md:flex-shrink-0 felx justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
                    <CarFront className="text-white size-5" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-left">
                  No shipping charges
                </p>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <div className="md:flex-shrink-0 felx justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
                    <ShieldCheck className="text-white size-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-left">
                  100% secure checkout
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <img src={deliveryGuy} alt="delivery-guy" className="w-full" />
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="px-10">
        <div className="grid grid-cols-2 gap-4 mt-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <Category name="Fast Food" icon={fastFood} />
          <Category name="Pizza" icon={Pizza} />
          <Category name="Row Meat" icon={Beef} />
          <Category name="Asian Food" icon={Soup} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
