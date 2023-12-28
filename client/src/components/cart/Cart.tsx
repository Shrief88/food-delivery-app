import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

import emptyCard from "../../assets/images/emptyCart.svg";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Cart = () => {
  //mocing data untill we build our server
  const itemsCount = 0;

  return (
    <Sheet>
      <SheetTrigger className="flex ml-4 items-center gap-2">
        <ShoppingCart className="size-6 flex-shrink-0 text-secondary-foreground " />
        <span className="text-sm text-gray-700">0</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col max-w-sm">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription className="h-full">
          {itemsCount > 0 ? null : (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={emptyCard} alt="emptyCard" />
              <p className="text-lg font-bold">Your cart is empty</p>
              <p>Looks like your haven't made your choice yet...</p>

              <NavLink
                to="/food"
                className={cn(
                  "mt-3",
                  buttonVariants({ variant: "destructive" })
                )}
              >
                <SheetClose>Start your order</SheetClose>
              </NavLink>
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
