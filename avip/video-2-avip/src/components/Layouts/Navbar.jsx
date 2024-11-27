import { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import Button from "../Elements/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice } from "../../context/TotalPrice";

export const Navbar = () => {
  const username = useLogin();
  const [totalCart, setTotalCart] = useState(0);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const cart = useSelector((state) => state.cart.data);
  const { total } = useTotalPrice();

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
    setTotalCart(sum);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-20 justify-between bg-blue-600 text-white items-center px-20 py-10">
      <h1 className="font-bold text-3xl">Shoes Store</h1>
      <div className="flex items-center">
        <a href="/profile" className="hover:underline">
          <div className="profile bg-black p-2 rounded hover:cursor-pointer hover:underline">
            {username}
          </div>
        </a>

        <Button classname="ml-5 bg-red-600" onClick={handleLogout}>
          Logout
        </Button>
        <div className="flex item-center bg-gray-800 p-2 rounded ml-5 mr-5">
          Item : {totalCart} | Price : $ {total}
        </div>
        <Button
          className=" bg-black px-10 mx-5 text-white rounded"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </div>
  );
};
