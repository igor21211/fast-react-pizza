import { formatCurrency } from "../../utils/helpers";
import { ICartItem } from "../cart/types";

interface OrderItemProps {
  item: ICartItem;
  isLoadingIngredients: boolean;
  ingredients: string[];
  key: number;
}

const OrderItem = ({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps): JSX.Element => {
  const { quantity, name, totalPrice, pizzaId } = item;
  console.log(ingredients);
  console.log(isLoadingIngredients);

  return (
    <li key={pizzaId} className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
        <p className="text-sm text-stone-500 capitalize italic">{isLoadingIngredients ? "Loading..." : ingredients.join(", ")}</p>
    </li>
  );
};

export default OrderItem;
