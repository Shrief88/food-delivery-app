import { X } from "lucide-react";

import { formatPrice } from "@/lib/utils";
import { ICartItem } from "@/model";
import { useAppDispatch } from "@/stateStore";
import { cartStateServices } from "@/reducers/cartSlice";

const CartItem = (props: ICartItem) => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-3 py-2 flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
          <img src={props.image} />
        </div>
        <div className="flex flex-col self-start">
          <span className="text-sm font-medium line-clamp-1">{props.name}</span>

          <div className="mt-2 text-sm text-muted-foreground">
            <button
              className="flex items-center gap-1"
              onClick={() => {
                dispatch(cartStateServices.actions.removeOneItem(props.mealId));
              }}
            >
              <X className="h-4 w-3" />
              Remove one item
            </button>
            <button
              className="flex items-center gap-1"
              onClick={() => {
                dispatch(cartStateServices.actions.removeAllItem(props.mealId));
              }}
            >
              <X className="h-4 w-3" />
              Remove All
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-1 font-medium">
        <span className="text-sm font-medium line-clamp-1">Quantity: {props.quantity}</span>
        <span className="ml-auto line-clamp-1 text-sm">
          {formatPrice(props.price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
