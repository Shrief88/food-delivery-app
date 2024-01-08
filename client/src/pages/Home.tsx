import { NavLink } from "react-router-dom";

import {
  ChevronRight,
  ShieldCheck,
  CarFront,
  Pizza,
  Soup,
  Drumstick,
} from "lucide-react";
import burger from "../assets/images/burger.svg";
import deliveryGirl from "../assets/images/hero.png";
import serviceOne from "../assets/images/service-01.png";
import servicsTwo from "../assets/images/service-02.png";
import serviceThree from "../assets/images/service-03.png";
import deliveryGuy from "../assets/images/location.png";
import network from "../assets/images/network.png";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/stateStore";
import { activeNavItemServices } from "@/reducers/activeNavItemSlice";

import MaxWidthWrapper from "../components/layout/MaxWidthWrapper";
import Category from "../components/home/Category";
import Perk from "../components/home/Perk";
import Info from "../components/home/Info";
import MyCarousel from "@/components/home/Carousel";

const Home = () => {
  const dispatch = useAppDispatch();

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
              <p className="text-muted-foreground max-w-prose mt-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                magni delectus tenetur autem, sint veritatis!
              </p>
            </div>
            <div className="flex gap-10 mt-10 justify-center">
              <NavLink
                className={buttonVariants()}
                to={"/checkout"}
                onClick={() =>
                  dispatch(
                    activeNavItemServices.actions.SetActiveNavItem("/checkout")
                  )
                }
              >
                Order now {<ChevronRight />}
              </NavLink>
              <NavLink
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-primary"
                )}
                onClick={() =>
                  dispatch(
                    activeNavItemServices.actions.SetActiveNavItem("/food")
                  )
                }
                to={"/food"}
              >
                See all foods
              </NavLink>
            </div>
            <div className="flex gap-10 mt-10 justify-center px-5 ">
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
            <img src={deliveryGirl} alt="delivery-guy" className="w-full" loading="lazy"/>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="px-4">
        <div className="grid grid-cols-2 gap-4 mt-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <Category name="Burger" icon={burger} />
          <Category name="Pizza" icon={Pizza} />
          <Category name="Fried Chicken" icon={Drumstick} />
          <Category name="Asian Food" icon={Soup} />
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="flex flex-col gap-4 mt-14">
          <p className="text-2xl sm:4xl tracking-tight text-primary">
            what we offer
          </p>
          <h1 className="text-3xl tracking-tight sm:text-4xl">
            Just sit back at home
          </h1>
          <h1 className="text-3xl tracking-tight sm:text-4xl">
            We will <span className="text-primary">take care</span>
          </h1>
          <div className="mt-5 flex flex-col gap-2 items-center">
            <p className="text-sm sm:text-lg text-muted-foreground max-w-prose">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              officiis?
            </p>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-prose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              eius.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="mt-14 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          <Perk
            name="Quick Delivery"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!"
            img={serviceOne}
          />
          <Perk
            name="Super Dine In"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!"
            img={servicsTwo}
          />
          <Perk
            name="Easy Pick Up"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!"
            img={serviceThree}
          />
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="px-5">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-14 text-left items-center">
          <div>
            <img src={deliveryGuy} className="w-full" />
          </div>
          <div>
            <h1 className="text-4xl tracking-tight">
              Why <span className="text-primary">Tasty Treat</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              minus. Tempora reprehenderit a corporis velit, laboriosam vitae
              ullam, repellat illo sequi odio esse iste fugiat dolor, optio
              incidunt eligendi deleniti!
            </p>
            <div className="mt-7 flex flex-col gap-7">
              <Info
                title="Fresh and tasty foods"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, voluptatibus."
              />
              <Info
                title="Quality support"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, voluptatibus."
              />
              <Info
                title="Order from any location"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, voluptatibus."
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="px-5">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-14 text-left items-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl tracking-tight">
              What our <span className="text-primary">customers</span> are
              saying
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio quasi qui minus quos sit perspiciatis inventore quis
              provident placeat fugiat!
            </p>
            <MyCarousel />
          </div>
          <div>
            <img src={network} />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* TODO: Add footer */}
    </div>
  );
};

export default Home;
