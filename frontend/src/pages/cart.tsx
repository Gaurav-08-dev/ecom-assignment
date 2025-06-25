import CartItem from "@/components/cartItem";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
const subtotal = 40000;
const cartItems = [{
  productId: "1",
  name: "Product 1",
  price: 99999,
  imageUrl: "https://m.media-amazon.com/images/I/71CjP9jmqZL._SL1500_.jpg",
  stock: 10,
  quantity: 1
}, {
  productId: "2",
  name: "Product 2",
  price: 20000,
  imageUrl: "https://m.media-amazon.com/images/I/71CjP9jmqZL._SL1500_.jpg",
  stock: 10,
  quantity: 2
}];
const shipping = 100;
const tax = Math.round(subtotal * 0.18);
const total = subtotal + tax + shipping;
const discount = 400;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCoupon(true);
      } else {
        setIsValidCoupon(false);
      }
    }, 300);
    return () => {clearTimeout(timer);
      setIsValidCoupon(false);
    };
  }, [couponCode]);

  return (
    <div>
      <main>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-500">Start shopping to add items to your cart</p>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.productId} cartItem={item} />
            ))}
          </div>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shipping}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em>- ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        {couponCode &&
          (isValidCoupon ? (
            <span className="text-green-500">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="text-red-500">
              Invalid coupon code <VscError className="inline-block" />
            </span>
          ))}
      </aside>
    </div>
  );
};

export default Cart;
