import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import activeNavItemReducer from "./reducers/activeNavItemSlice";
import authStateReducer from "./reducers/authStateSlice";
import cartStateReducer from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    activeNavItem: activeNavItemReducer,
    authState : authStateReducer,
    cartState : cartStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
