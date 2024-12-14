import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { ICartItem } from "./types";

const CartItem =
  ({ item }: { item: ICartItem }): JSX.Element => {
    const { pizzaId, name, quantity, totalPrice } = item;

    return (
      <li className="py-3 sm:flex sm:items-center sm:justify-between">
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        <div className="flex items-center justify-between sm:gap-6">
          <p>{formatCurrency(totalPrice)}</p>
          <Button type="small">Delete</Button>
        </div>
      </li>
    );
  };

export default CartItem;
