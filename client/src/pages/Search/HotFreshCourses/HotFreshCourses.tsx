import { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import HotCourseCard from "./HotCourseCard/HotCourseCard";

const HotFreshCourses = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 50, behavior: "smooth" });
    }
  };

  return (
    <div className="w-[1000px] relative">
      <h2 className="font-bold text-[1.5em] my-[0.5em]">
        Hot and Fresh Courses
      </h2>
      <div
        className="w-full overflow-x-auto flex flex-row items-center justify-center pb-[1.5em] gap-[1em]"
        ref={carouselRef}
      >
        <HotCourseCard />
        <HotCourseCard />
        <HotCourseCard />
        <HotCourseCard />
      </div>
      <button
        onClick={scrollLeft}
        className="hover:bg-[#e9eaf2] absolute left-0 top-[50%] transform -translate-y-1/2 bg-white text-white p-3 rounded-full shadow-carouselShadowBtn hover:brightness-125 transition duration-200"
      >
        <MdKeyboardArrowLeft size={24} className="text-black" />
      </button>
      <button
        onClick={scrollRight}
        className="hover:bg-[#e9eaf2] absolute right-0 top-[50%] transform -translate-y-1/2 bg-white text-white p-3 rounded-full shadow-carouselShadowBtn hover:brightness-125 transition duration-200"
      >
        <MdKeyboardArrowRight size={24} className="text-black" />
      </button>
    </div>
  );
};

export default HotFreshCourses;
