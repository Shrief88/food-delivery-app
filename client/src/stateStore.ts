import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import activeNavItemReducer from "./reducers/activeNavItemSlice";
import authStateReducer from "./reducers/authStateSlice";
import cartStateReducer from "./reducers/cartSlice";
import { cartStateServices } from "./reducers/cartSlice";

const listenMiddleware = createListenerMiddleware();
listenMiddleware.startListening({
  matcher: isAnyOf(
    cartStateServices.actions.addItem,
    cartStateServices.actions.removeAllItem,
    cartStateServices.actions.removeOneItem
  ),
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      "cart",
      JSON.stringify((listenerApi.getState() as RootState).cartState)
    );
  },
});

const store = configureStore({
  reducer: {
    activeNavItem: activeNavItemReducer,
    authState: authStateReducer,
    cartState: cartStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
