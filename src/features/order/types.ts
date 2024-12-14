import { ICartItem } from "../cart/types";

export interface IOrder {
  id: string;
  customer: string;
  status: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: ICartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}
export interface OrderResponse {
  data: IOrder;
}
export interface OrderFormData {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: ICartItem[];
}
