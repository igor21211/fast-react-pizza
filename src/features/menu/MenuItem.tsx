import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { IMenuItem } from "./types";
import { addItem } from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import { RootState } from "../../services/store";

const MenuItem = ({ pizza }: { pizza: IMenuItem }): JSX.Element => {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const handleAddToCart = (): void => {
    if (!soldOut) {
      dispatch(addItem({ pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice * 1 }));
    }
  };

  const hasItemInCart = useSelector((state: RootState) => state.cart.cart.some((item) => item.pizzaId === id));

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className="flex flex-col gap-1 grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-3 sm:gap-8" >
            { hasItemInCart && <DeleteButton pizzaId={id} />}
            {!soldOut && !hasItemInCart && <Button onClick={handleAddToCart} type="small">Add to cart</Button>}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
