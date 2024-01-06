import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { ICartItem } from "@/model";

interface cartState {
  cartItems: ICartItem[];
  user: string;
  itemsCount: number;
}

const initialState: cartState = {
  cartItems: [],
  user: "anonymous",
  itemsCount: 0,
};

const cartStateSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    addItem: (state, action: { payload: ICartItem }) => {
      if (state.cartItems.length > 0) {
        if (
          state.cartItems.some((item) => item.mealId === action.payload.mealId)
        ) {
          state.cartItems = state.cartItems.map((item) => {
            if (item.mealId === action.payload.mealId) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
                price: item.price + action.payload.price,
              };
            } else {
              return item;
            }
          });
        } else {
          state.cartItems.push(action.payload);
        }
      } else {
        state.cartItems.push(action.payload);
      }
      toast.success("Added to cart");
      state.itemsCount++;
    },

    removeAllItem: (state, action: { payload: string }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.mealId !== action.payload
      );
      state.itemsCount = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      toast.success("Items removed from cart");
    },

    removeOneItem: (state, action: { payload: string }) => {
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.mealId === action.payload) {
            return {
              ...item,
              price: item.price - item.price / item.quantity,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0);
      state.itemsCount--;
      toast.success("Item removed from cart");
    },
  },
});

export const cartStateServices = {
  actions: cartStateSlice.actions,
};

const cartStateReducer = cartStateSlice.reducer;

export default cartStateReducer;
