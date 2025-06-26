import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
  cartItem: any; // Adjust type as needed
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { productId, name, price, quantity, imageUrl, stock } = cartItem;

  return (
    <div className="p-4 flex flex-row justify-start items-center gap-12">
      <div className="flex items-center gap-2">
        <img
          src={imageUrl}
          alt={name}
          className="w-40 h-40 object-contain"
        />
        <article className="flex flex-col justify-center items-start gap-1">
          <Link
            to={`/product/${productId}`}
            className="text-[1.2rem] text-blue-600 hover:text-blue-800"
          >
            {name}
          </Link>
          <span className="font-bold text-gray-700">Price: ₹{price}</span>
          <span className="font-bold text-gray-700">Quantity: {quantity}</span>
        </article>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md text-[1.2rem] hover:bg-blue-600 hover:text-white"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md text-[1.2rem] hover:bg-blue-600 hover:text-white"
          >
            +
          </button>
        </div>
        <button
          type="button"
          title="Remove"
          className="text-[1.2rem] text-red-500 hover:text-red-700 transition-colors flex items-center justify-center"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
