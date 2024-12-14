import { LoaderFunction } from "react-router-dom";
import { IMenuItem, MenuResponse } from "../features/menu/types";
import { IOrder, OrderFormData, OrderResponse } from "../features/order/types";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu(): Promise<IMenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const { data }: MenuResponse = await res.json();
  return data;
}

export async function getOrder(orderId: string): Promise<IOrder> {
  const response = await fetch(`${API_URL}/order/${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  const { data }: OrderResponse = await response.json();
  return data;
}

export async function createOrder(newOrder: any): Promise<OrderFormData> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: number, updateObj: any): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
