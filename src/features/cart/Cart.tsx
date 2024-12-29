
import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../services/store";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { formatCurrency } from "../../utils/helpers";


const Cart = (): JSX.Element => {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalCartPrice = useSelector((state: RootState) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0));

  const handleClearCart = (): void => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3">
      <LinkButton
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <div>
        <ul className="mt-3 divide-y divide-stone-200 border-b border-t">
          {cartItems.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
      </ul>
      <div className="mt-6 space-x-2 flex justify-between items-center">
        <div>

          <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleClearCart} type="secondary">Clear cart</Button>
        </div>

        <p className="mt-7 font-medium">
          {formatCurrency(totalCartPrice)}
        </p>
      </div>
      </div>
    </div>
  );
};

export default Cart;
