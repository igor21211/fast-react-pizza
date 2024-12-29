import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { ICartItem } from "./types";
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from "./cartSlice";
import DeleteButton from "./DeleteButton";

const CartItem =
  ({ item }: { item: ICartItem }): JSX.Element => {
    const { pizzaId, name, quantity, totalPrice } = item;
    const dispatch = useDispatch();

    const handleIncreaseItemQuantity = (): void => {
      dispatch(increaseItemQuantity(pizzaId));
    };

    const handleDecreaseItemQuantity = (): void => {
      dispatch(decreaseItemQuantity(pizzaId));
    };      

    return (
      <li className="py-3 sm:flex sm:items-center sm:justify-between">
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        <div className="flex items-center justify-between sm:gap-4">
          <p>{formatCurrency(totalPrice)}</p>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button onClick={handleIncreaseItemQuantity} type="small">+</Button>
            <Button onClick={handleDecreaseItemQuantity} type="small">-</Button>
          </div>
          <DeleteButton pizzaId={pizzaId} />
        </div>
      </li>
    );
  };

export default CartItem;
