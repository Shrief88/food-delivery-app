import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { useEffect, useState } from "react";
import useAxiosToken from "@/hooks/useAxiosToken";
import { IOrder } from "@/model";
import { NavLink } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

const Order = () => {
  const axiosClient = useAxiosToken();
  const [orders, setOrders] = useState<IOrder[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: IOrder[] = (await axiosClient.get("/order")).data.data;
        setOrders(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [axiosClient]);

  return (
    <MaxWidthWrapper className="mt-10">
      {orders &&
        (orders.length > 0 ? (
          <ul className="divide-y divide-gray-200 border-gray-200">
            {orders.map((order) => (
              <div className="py-4" key={order._id}>
                <p>Order ID : {order._id}</p>
                <p className="mt-2 text-base">
                  Delivered State :{" "}
                  {order?.deliveredAt ? "Delivered" : "Being Delivered"}
                </p>
                {order.cartItems.map((item) => (
                  <li key={item.mealId} className="flex py-4 items-center">
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
              </div>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-zinc-200 py-12 px-10 mx-auto text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-2xl font-semibold">You has not made any order yet</p>
            </div>
          </div>
        ))}
    </MaxWidthWrapper>
  );
};

export default Order;
