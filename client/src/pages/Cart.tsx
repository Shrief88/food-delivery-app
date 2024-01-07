import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useTypedSelector } from "@/stateStore";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const cartItems = useTypedSelector((state) => state.cartState.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const transactionFee = 1;

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h3>
        <div className="mt-12 lg:grid lg grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 py-12":
                cartItems.length === 0,
            })}
          >
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-2xl font-semibold">Your cart is empty</p>
                <p className="text-muted-foreground">
                  Whoops! Nothing to show yet
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  cartItems.length > 0,
              })}
            >
              {cartItems.map((item) => (
                <li
                  key={item.mealId}
                  className="flex py-6 sm:py-10 items-center"
                >
                  <div className="flex-shrink-0">
                    <div className="relative h-24 w-24">
                      <img
                        src={item.image}
                        className="h-full w-full rounded-md object-cover object-center sm:h-24 sm:w-24"
                      />
                    </div>
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <NavLink to={`/menu/${item.mealId}`}>
                              {item.name}
                            </NavLink>
                          </h3>
                        </div>

                        <div className="mt-1 flex text-sm">
                          <p className="text-muted-foreground">
                            Category : {item.category}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-muted-foreground">
                            Quantity : {item.quantity}
                          </p>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-t-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Transaction Fee</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(transactionFee)}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-t-gray-200 pt-4">
                <div className="flex items-center text-md font medium text-gray-900">
                  <span>Order Total</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(transactionFee + totalPrice)}
                </p>
              </div>
              
            </div>
            <Button className="w-full mt-6" size={"lg"}>Checkout</Button>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Cart;
