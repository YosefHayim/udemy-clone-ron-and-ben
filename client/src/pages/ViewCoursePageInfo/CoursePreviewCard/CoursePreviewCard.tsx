import CoursePrice from "@/components/CourseCard/CoursePrice/CoursePrice";
import coursePreviewImg from "/images/course-preview-card.png";
import { LuAlarmClock } from "react-icons/lu";
import AddToCart from "@/pages/Search/CourseHoverCardInfo/InteractionBtns/AddToCart/AddToCart";
import BuyNowBtn from "./BuyNowBtn/BuyNowBtn";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BiMobile } from "react-icons/bi";
import { IoIosInfinite } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";

const CoursePreviewCard = () => {
  return (
    <div className="w-[300px] h-[750px] p-[1.5em] shadow-previewCourseCardShadow">
      <div className="">
        <img src={coursePreviewImg} alt="" />
        <b className="absolute text-white translate-y-[-1.5em] text-center">
          Preview this course
        </b>
      </div>
      <div>
        <CoursePrice
          discountPrice={"39.90"}
          fullPrice={"79.90"}
          chooseFlex={"flex flex-row items-center"}
          discountPriceSize={"2em"}
        />
      </div>
      <div className="text-[#b32d0f] flex flex-row gap-[0.2em] items-center">
        <LuAlarmClock />
        <b>3 days</b>
        <p>left at this price!</p>
      </div>
      <div className="flex flex-col gap-[0.5em] mb-[0.5em]">
        <AddToCart />
        <BuyNowBtn />
      </div>
      <div>
        <p className="text-[#2d2f31] text-[0.8em] text-center">
          30-Day Money-Back Guarantee
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-[0.5em]">This course includes:</h2>
        <ul className="text-[0.8em] flex-col gap-[0.5em]">
          <div className="flex items-center gap-[0.5em]">
            <MdOutlineOndemandVideo />
            <li>2 hours on-demand video</li>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <BiMobile />
            <li>Access on mobile and TV</li>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <IoIosInfinite />
            <li>Full lifetime access</li>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <IoTrophyOutline />
            <li>Certificate on completion</li>
          </div>
        </ul>
      </div>
      <div className="flex flex-row gap-[2em]">
        <b className="underline">Span</b>
        <b className="underline">Gift this course</b>
        <b className="underline">Apply Coupon</b>
      </div>
      <div className="border-dashed border-"></div>
    </div>
  );
};

export default CoursePreviewCard;
