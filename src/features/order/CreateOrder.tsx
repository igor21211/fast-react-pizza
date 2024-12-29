import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { ICartItem } from "../cart/types";
import { OrderFormData } from "./types";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../services/store";
import { FormEvent, useState } from "react";
import EmptyCart from "../cart/EmptyCart";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string): boolean =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


const CreateOrder = (): JSX.Element => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
   const [withPriority, setWithPriority] = useState(false);
   const dispatch = useDispatch<AppDispatch>();  
  const formErrors: { phone?: string } = useActionData() as { phone?: string };
  const username = useSelector((state: RootState) => state.user.username);
  const address = useSelector((state: RootState) => state.user.address);
  const loading = useSelector((state: RootState) => state.user.status === "loading");
  const error = useSelector((state: RootState) => state.user.error);
  const cart = useSelector((state: RootState) => state.cart.cart);  
  const totalCartPrice = useSelector((state: RootState) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0));
  const priorityPrice = withPriority ? 0.1 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(cart.length === 0) return <EmptyCart />;


  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required defaultValue={username} />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5  flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            {loading ? <input className="input w-full" type="text" name="address" defaultValue={'Loading...'} disabled /> : <input className="input w-full" type="text" name="address" required defaultValue={address} />}
          <span className="absolute right-[3px] z-50 sm:right-auto">
          <Button disabled={loading} type="small" onClick={(e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(fetchAddress());
          }}>Get position</Button>
          </span>
          {error ? <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{error}</p> : null}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mb-5">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            disabled={isSubmitting}
            type="primary"
          >
            {isSubmitting ? "Placing order..." : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export async function action({
  request,
}: {
  request: Request;
}): Promise<Response> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string) as ICartItem[],
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder: OrderFormData = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
