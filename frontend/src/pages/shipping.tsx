import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "india",
    pinCode: "",
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Shipping Information Submitted:", shippingInfo);
    // navigate("/payment");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <button
        title="Back to Cart"
        type="button"
        className="absolute top-[10%] left-8 w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition-colors hover:cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack className="transition-transform hover:-translate-x-1" />
      </button>

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md flex flex-col items-center gap-8 p-8 shadow-lg rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold tracking-wider mb-4 text-center">
          Shipping Address
        </h1>

        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          className="w-full border border-gray-400 p-4 rounded-md text-[1.05rem] outline-none"
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          className="w-full border border-gray-400 p-4 rounded-md text-[1.05rem] outline-none"
        />

        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          className="w-full border border-gray-400 p-4 rounded-md text-[1.05rem] outline-none"
        />

        <select
          title="Country"
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
          className="w-full border border-gray-400 p-4 rounded-md text-[1.05rem] outline-none"
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
          className="w-full border border-gray-400 p-4 rounded-md text-[1.05rem] outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-6 rounded-md text-[1.05rem] uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
