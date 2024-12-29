
import LinkButton from "../../UI/LinkButton";

const EmptyCart = (): JSX.Element => {
  return (
    <div className="px-4 py-3 text-center mt-7">
      <LinkButton
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <p className="mt-7 font-medium">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
};

export default EmptyCart;
