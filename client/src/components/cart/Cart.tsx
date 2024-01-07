import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import emptyCard from "../../assets/images/emptyCart.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../ui/sheet";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

import { useAppDispatch } from "@/stateStore";
import { activeNavItemServices } from "@/reducers/activeNavItemSlice";
import { formatPrice } from "@/lib/utils";
import { useTypedSelector } from "@/stateStore";
import CartItem from "./CartItem";

const Cart = () => {
  const { itemsCount } = useTypedSelector((state) => state.cartState);
  const cart = useTypedSelector((state) => state.cartState);
  const totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

  const shipping = 0;
  const fee = 1;

  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger className="flex ml-4 items-center gap-2">
        <ShoppingCart className="size-6 flex-shrink-0 text-secondary-foreground " />
        <span className="text-sm text-gray-700">{itemsCount}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-center">Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        <SheetDescription className="h-full">
          {itemsCount > 0 ? (
            <div className="space-y-3">
              <p className="text-base font-bold">Cart Items</p>
              <div className="flex flex-col w-full">
                <ScrollArea>
                  {cart.cartItems.map((item) => (
                    <CartItem key={item.mealId} {...item} />
                  ))}
                </ScrollArea>
              </div>
              <Separator />
              <div className="space-y-1.5 text-base">
                <div className="flex">
                  <span className="flex-1">Shopping</span>
                  <span>{shipping > 0 ? formatPrice(shipping) : "Free"}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{fee > 0 ? formatPrice(fee) : "Free"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <p>Total Price</p>
                <span>{formatPrice(shipping + fee + totalPrice)}</span>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <NavLink
                    to="/cart"
                    className={cn(
                      "mt-3 w-full",
                      buttonVariants({ variant: "destructive" })
                    )}
                  >
                    Continue to checkout
                  </NavLink>
                </SheetTrigger>
              </SheetFooter>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img src={emptyCard} alt="emptyCard" />
              <p className="text-lg font-bold">Your cart is empty</p>
              <p>Looks like your haven't made your choice yet...</p>
              <SheetFooter>
                <SheetTrigger asChild>
                  <NavLink
                    to="/menu"
                    className={cn(
                      "mt-3",
                      buttonVariants({ variant: "destructive" })
                    )}
                    onClick={() =>
                      dispatch(
                        activeNavItemServices.actions.SetActiveNavItem("/menu")
                      )
                    }
                  >
                    Start your order
                  </NavLink>
                </SheetTrigger>
              </SheetFooter>
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
