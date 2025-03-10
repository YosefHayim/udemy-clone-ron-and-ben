import { MdOutlineShoppingCart } from "react-icons/md";
import CartCoursesNumber from "./CartCoursesNumber/CartCoursesNumber";
import { useState } from "react";
import HoverCart from "./HoverCart/HoverCart";

const Cart = () => {
  const [showCartHover, setShowCartHover] = useState(false);

  const handleMouseEnter = () => setShowCartHover(true);
  const handleMouseLeave = () => setShowCartHover(false);

  return (
    <div
      className="relative mr-[0.3em]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="font-bold hover:text-purple-800 hover:bg-purple-100 py-[0.6rem] px-[0.6rem] rounded-md">
        <MdOutlineShoppingCart className="w-5 h-5" />
        <CartCoursesNumber />
      </div>
      {showCartHover && (
        <div className="absolute top-full left-0 z-[5000] p-[2em]">
          <HoverCart />
        </div>
      )}
    </div>
  );
};

export default Cart;
