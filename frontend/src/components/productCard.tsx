
import { FaPlus } from "react-icons/fa";

type ProductCardProps = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  handler?: () => void;
};

const ProductCard = ({
  productId,
  name,
  price,
  imageUrl,
  stock,
  handler = () => {},
}: ProductCardProps) => {
  return (
    <div className="w-2xs h-96 px-4 flex-none flex-col justify-between items-start bg-white shadow-xl rounded-lg font-bold text-lg text-gray-800 relative">
      <img src={imageUrl} alt={name} className="aspect-square object-cover" />
      <div className="flex justify-between items-start w-full">
        <h2>{name}</h2>
        <span>₹{price}</span>
      </div>
      <div className="opacity-0 hover:opacity-100 absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center text-white text-lg font-bold rounded-lg transition-all">
        <button
          title="Add to cart"
          type="button"
          className="w-10 h-10 rounded-full flex justify-center items-center transition-colors cursor-pointer bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800"
          onClick={handler}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
