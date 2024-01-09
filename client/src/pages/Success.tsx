import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { useTypedSelector } from "@/stateStore";
import { NavLink } from "react-router-dom";
import useAxiosToken from "@/hooks/useAxiosToken";
import { useEffect, useState } from "react";
import { IOrder } from "@/model";
import { useAppDispatch } from "@/stateStore";
import { cartStateServices } from "@/reducers/cartSlice";
import { activeNavItemServices } from "@/reducers/activeNavItemSlice";

const Success = () => {
  const user = useTypedSelector((state) => state.authState.user);
  const axiosClientWithToken = useAxiosToken();
  const [order, setOrder] = useState<IOrder | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: IOrder[] = (await axiosClientWithToken.get("/order")).data
          .data;
        setOrder(res[res.length - 1]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    dispatch(cartStateServices.actions.clearCart());
  }, [axiosClientWithToken, dispatch]);

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 ">
        <div className="lg:col-start-2">
          <p className="text-sm text-blue-700">Order Succussful</p>
          <h1 className="mt-4 text-bold text-4xl tracking-tight sm:text-5xl text-gray-900">
            Thanks for Ordering
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Your order was processed successfully , We have sent your receipt
            and order details to your email : {user?.email}
          </p>
          {order && (
            <p className="mt-2 text-base">Your order id is : {order._id}</p>
          )}
          <p className="mt-2 text-base">
            Delivered State :{" "}
            {order?.deliveredAt ? "Delivered" : "Being Delivered"}
          </p>
          <NavLink
            className="text-blue-700 text-sm hover:underline flex justify-end mt-4"
            to={"/menu"}
          >
            View all your orders &rarr;
          </NavLink>
          <NavLink
            className="text-blue-700 text-sm hover:underline flex justify-end mt-4"
            to={"/menu"}
            onClick={() => dispatch(activeNavItemServices.actions.SetActiveNavItem("/menu"))}
          >
            Contiue shopping &rarr;
          </NavLink>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Success;
