import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../services/store";
import { formatCurrency } from "../../utils/helpers";

const CartOverview = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalCartPrice = useSelector((state: RootState) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0));
  const totalCartQuantity = useSelector((state: RootState) => state.cart.cart.reduce((acc, item) => acc + item.quantity, 0));
  if (cartItems.length === 0) return <></>;

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;
