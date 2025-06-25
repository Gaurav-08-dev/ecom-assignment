import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaFirstOrder
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { OutsideClickWrapper } from "./OutsideClickWrapper";

const user = {
  _id: 1,
  name: "Gaurav",
  role: "user",
};
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <nav className=" p-4 flex justify-between items-center shadow-md bg-gray-100">
      <Link to="/" className="font-bold">
        Home
      </Link>

      <div className="flex space-x-4 items-center">
        <Link to="/search" className="">
          <FaSearch className="" title="Search" />
        </Link>
        <Link to="/cart" className="">
          <FaShoppingCart className="" title="Shopping Cart" />
        </Link>

        {user?._id ? (
          <div className="relative">
            <button
              type="button"
              title="Profile"
              className="flex items-center hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUser className="" title={user.name} />
            </button>
            <OutsideClickWrapper onClose={() => setIsOpen(false)}>
              <div
                className={`absolute right-0 mt-2 bg-white p-4 rounded shadow-xl flex flex-col space-y-2 items-start ${
                  isOpen ? "block" : "hidden"
                } w-32`}
              >
                <Link to="/orders" className="flex items-center space-x-2">
                  <FaFirstOrder />
                  <span>Orders</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:cursor-pointer"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </div>
            </OutsideClickWrapper>
          </div>
        ) : (
          <Link to="/login" className="">
            <FaSignInAlt className="" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
