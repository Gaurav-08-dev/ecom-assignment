import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
  cartItem: unknown;
};
const CartItem = ({ cartItem }: CartItemProps) => {
  const { productId, name, price, quantity, imageUrl, stock } = cartItem;

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-2">
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <article className="flex flex-col gap-1">
          <Link to={`/product/${productId}`} className="hover:underline ">
            {name}
          </Link>
          <span className="text-gray-500">Price: ₹{price}</span>
          <span className="text-gray-500">Quantity: {quantity}</span>
        </article>
      </div>

      <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button type="button">-</button>
        <p>{quantity}</p>
        <button type="button">+</button>
      </div>
      <button
        type="button"
        title="Remove"
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <FaTrash />
      </button>
      </div>
    </div>
  );
};

export default CartItem;
