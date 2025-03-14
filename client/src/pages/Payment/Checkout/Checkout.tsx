import buyCourseById from "@/api/users/buyCourseId";
import refreshMe from "@/api/users/refreshMe";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux";
import { setClearAll } from "@/redux/slices/cartSlice";
import {
  setCookie,
  setCoursesBought,
  setUdemyCredits,
} from "@/redux/slices/userSlice";
import { DecodedTokenProps } from "@/types/types";
import { ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC<{ isPaypal: ReactPayPalScriptOptions }> = ({
  isPaypal,
}) => {
  const cookie = useSelector((state: RootState) => state.user.cookie);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalToPay = useSelector(
    (state: RootState) => state.cart.totalCourseDiscountPrices
  );

  const totalCourses = useSelector(
    (state: RootState) => state.cart.amountOfCourses
  );

  const originalPrice = useSelector(
    (state: RootState) => state.cart.totalCoursesOriginalPrices
  );

  const coursesIds = useSelector(
    (state: RootState) => state.cart.coursesAddedToCart
  );

  useEffect(() => {}, [originalPrice, totalCourses, totalToPay, cookie]);

  const checkOutMutation = useMutation({
    mutationFn: buyCourseById,
    onSuccess: () => {
      setTimeout(() => {
        refreshUserDataMutation.mutate();
      }, 500);
    },
  });

  const refreshUserDataMutation = useMutation({
    mutationFn: refreshMe,
    onSuccess: () => {
      setTimeout(() => {
        const decoded = jwtDecode<DecodedTokenProps>(cookie || "");
        dispatch(setCookie(cookie || ""));
        dispatch(setCoursesBought(decoded.coursesBought));
        dispatch(setUdemyCredits(decoded.udemyCredits));
        navigate(`/course-view/${coursesIds[0]}`);
        dispatch(setClearAll());
      }, 2000);
    },
  });

  const handleClick = () => {
    if (!coursesIds.length) {
      console.log("No courses available for checkout.");
      return;
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 2000);

    const courseId = coursesIds[coursesIds.length - 1];
    if (!courseId) {
      console.log("Invalid courseId received.");
      return;
    }
    checkOutMutation.mutate(courseId);
  };

  return (
    <div className="flex flex-col items-start justify-start p-[3em] w-min-max">
      <div className="flex flex-col items-start justify-start w-full">
        <h2 className="font-bold mb-[1em] text-[1.5em] w-full">
          Order Summary
        </h2>
        <div className="flex flex-col items-start justify-start gap-[0.5em] w-[75%]">
          <div className="flex flex-row items-start justify-between w-full gap-[5em]">
            <p>Original price:</p>
            <p>₪{originalPrice || 0}</p>
          </div>
          <hr className="w-full border border-b-gray-400" />
          <div className="flex flex-row items-start justify-between w-full mb-[3em]">
            <div className="flex flex-row gap-[0.3em]">
              <b>Total</b>
              <p>({totalCourses} course)</p>
            </div>
            {isPaypal ? <b>Proceed</b> : <b>₪{totalToPay?.toFixed(2) || 0}</b>}
          </div>
        </div>
        <div className="mb-[1em] w-[75%]">
          <p>
            By completing your purchase you agree to these{" "}
            <span className="text-btnColor">Terms of Service.</span>
          </p>
        </div>
        <div className="mb-[2em] w-[75%]">
          <Button
            onClick={handleClick}
            className="w-full rounded-[0.2em] bg-btnColor hover:bg-[#892de1] font-bold text-white p-[1.7em]"
          >
            {isLoading ? (
              <div>
                <Loader useSmallLoading={true} hSize="" />
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <IoMdLock />
                Pay ₪{totalToPay?.toFixed(2) || 0}
              </div>
            )}
          </Button>
        </div>
        <div className="w-[75%] flex flex-col items-center justify-center mb-[3em] gap-[1em]">
          <b>30-Day Money-Back Guarantee</b>
          <p className="text-center">
            Not satisfied? Get a full refund within 30 days. Simple and
            straightforward!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
