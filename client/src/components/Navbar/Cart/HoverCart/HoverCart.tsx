import { Button } from "@/components/ui/button";
import ItemInCart from "../ItemInCart/ItemInCart";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

const HoverCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const totalToPay = useSelector(
    (state: any) => state.cart.totalCourseDiscountPrices
  );
  const coursesIdAdded = useSelector(
    (state: any) => state.cart.coursesAddedToCart
  );

  useEffect(() => {
    // Simulate a loading delay to mimic data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [totalToPay, coursesIdAdded]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader hSize="1000px" useSmallLoading={false} />
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-t-lg text-[0.5em] flex flex-col justify-center items-start border border-gray-300 w-[300px] bg-white z-[1000] absolute right-[0em] top-[1em] shadow-previewCourseCardShadow cursor-pointer">
        <div className="w-full">
          {coursesIdAdded.length > 0 ? (
            coursesIdAdded.map((courseId: string) => (
              <ItemInCart
                key={courseId}
                courseImgSize={`h-[5em] w-[5em] rounded-[0.5em]`}
                courseId={courseId}
                hide={false}
                showDisPrice={true}
                showFullPrice={false}
                shortCutInstructor={true}
                shortcutTitle={true}
                chooseFlex={"flex flex-col"}
                itemsPosition="start"
                textColor="text-bg-black"
                textSize="text-[1em]"
                gapPrice="gap-[0em]"
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full text-center mt-[1em]">
              <p className="text-gray-300 font-light">Your cart is empty.</p>
              <b className="text-purpleStatic hover:text-purpleHover cursor-pointer">
                <Link to="/">Keep shopping</Link>
              </b>
            </div>
          )}
        </div>
        <div className="w-full p-[1em] flex flex-col">
          {totalToPay && coursesIdAdded ? (
            <div>
              <b className="text-[1.5em]">
                Total: ₪{totalToPay ? totalToPay.toFixed(2) : "0.00"}
              </b>
              <Button className="mt-[1em] w-full rounded-[0.3em] bg-btnColor hover:bg-btnHoverColor py-[1.7em] font-bold">
                <Link to="/cart" className="cursor-pointer">
                  Go to cart
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HoverCart;
