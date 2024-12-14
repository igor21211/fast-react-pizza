import { createBrowserRouter } from "react-router-dom";
import Menu, { loader as loaderMenu } from "../features/menu/Menu";
import { loaderOrder } from "../features/order/Order";
import AppLayout from "../UI/AppLayout";
import Cart from "../features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "../features/order/CreateOrder";
import Order from "../features/order/Order";
import Home from "../UI/Home";
import Error from "../UI/Error";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: loaderMenu,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:id",
        element: <Order />,
        loader: loaderOrder,
        errorElement: <Error />,
      },
    ],
  },
]);
