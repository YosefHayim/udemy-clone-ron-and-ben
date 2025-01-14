import { useState, useEffect } from "react";
import CoursePrice from "@/components/CourseCard/CoursePrice/CoursePrice";
import coursePreviewImg from "/images/course-preview-card.png";
import MoneyBack from "./MoneyBack/MoneyBack";
import CourseIncludes from "./CourseIncludes/CourseIncludes";
import InteractionBtns from "./InteractionBtns/InteractionBtns";
import TimeLeftBuyCourse from "./TimeLeftBuyCourse/TimeLeftBuyCourse";
import CouponArea from "./CouponArea/CouponArea";
import UdemyBusiness from "./UdemyBusiness/UdemyBusiness";
import AddCartNBuyBtn from "./AddCartNBuyBtn/AddCartNBuyBtn";

const CoursePreviewCard = ({
  courseImg,
  discountPrice,
  fullPrice,
  courseId,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [opacity, setOpacity] = useState(1); // Default opacity for static

  useEffect(() => {
    const handleScroll = () => {
      const shouldFix = window.scrollY > 350;
      if (shouldFix && !isFixed) {
        setOpacity(0); // Reset opacity before fade-in
        setTimeout(() => setOpacity(1), 50); // Trigger fade-in
      }
      setIsFixed(shouldFix);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  return (
    <div
      className={`shadow-previewCourseCardShadow w-[320px] z-[1500] bg-white border border-b-gray-100 ${
        isFixed ? "fixed right-[20%] top-[2%]" : "static"
      } transition-all duration-300 ease-in-out`}
      style={{
        opacity: opacity, // Controlled opacity for fade-in
        transform: isFixed ? "translateY(0)" : "translateY(20px)", // Adds movement effect
        pointerEvents: "auto", // Ensure interactions are always possible
      }}
    >
      <div>
        <img src={courseImg} alt="Image of the course" />
        <b className="absolute text-white translate-y-[-1.5em]">
          Preview this course
        </b>
      </div>
      <div className="p-[1.5em]">
        <div>
          <CoursePrice
            discountPrice={discountPrice}
            fullPrice={fullPrice}
            chooseFlex={"flex flex-row items-center"}
            discountPriceSize={"2em"}
          />
        </div>
        <TimeLeftBuyCourse />
        <AddCartNBuyBtn courseId={courseId} discountPrice={discountPrice} />
        <MoneyBack />
        <CourseIncludes />
        <InteractionBtns />
        <CouponArea />
        <UdemyBusiness />
      </div>
    </div>
  );
};

export default CoursePreviewCard;
