// Test ID: IIDSAT

import {
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { IOrder } from "./types";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import { ICartItem } from "../cart/types";
import { IMenuItem } from "../menu/types";

const Order = (): JSX.Element => {
  const order = useLoaderData() as IOrder;
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();
  useEffect(() => {
    if(!fetcher.data && fetcher.state === "idle") {
      fetcher.load(`/menu`);
    }
  }, [fetcher.data, fetcher.state, fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 text-red-50 tracking-wide rounded-full px-2 py-1 text-sm uppercase">Priority </span>}
          <span className="bg-green-500 text-green-50 tracking-wide rounded-full px-2 py-1 text-sm uppercase">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500 font-medium">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul>
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state === "loading"} ingredients={fetcher.data?.find((pizza: IMenuItem) => pizza.id === item.pizzaId)?.ingredients ?? []} />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
};

export async function loaderOrder({
  params,
}: LoaderFunctionArgs): Promise<IOrder> {
  const { id } = params;
  if (!id) {
    throw new Error("Order ID is required");
  }
  const order: IOrder = await getOrder(id);
  return order;
}

export default Order;
