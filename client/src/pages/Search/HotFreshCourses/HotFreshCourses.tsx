import ButtonsCarousel from "@/components/ButtonsCarousel/ButtonsCarousel";
import HotCourseCard from "./HotCourseCard/HotCourseCard";
import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllCourses from "@/api/courses/getAllCourses";
import Loader from "@/components/Loader/Loader";
import { CourseTypeProps } from "@/types/types";

const HotFreshCourses = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const convertArrayStringToRegArray = JSON.parse(localStorage.getItem("searchesOfUser"));
  const [arrayAlgo, setArrayAlgo] = useState(convertArrayStringToRegArray);

  const randomAlgoWord = arrayAlgo[Math.floor(Math.random() * arrayAlgo.length)];

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const { data } = useQuery({
    queryKey: [`${randomAlgoWord}`, randomAlgoWord],
    queryFn: () => getAllCourses(randomAlgoWord),
    enabled: !!randomAlgoWord,
  });

  if (!data) {
    console.log("No data received");
    return null;
  }

  return (
    <div className="w-[1000px]">
      <h2 className="my-[0.5em] font-sans text-[1.5em] font-extrabold">Hot and Fresh Courses</h2>
      <div className="relative w-full overflow-hidden">
        {data.response && data?.response?.length > 7 && (
          <ButtonsCarousel
            handleFnNext={handleNext}
            handleFnPrev={handlePrev}
            state={currentIndex}
            useCustom={true}
            showDirectionalButtonsOnlyOnEdge={true}
            topPosition="55%"
            leftPosition="1%"
            rightPosition="2%"
          />
        )}
        <div
          className={`flex ${data.response && data.response?.length > 7 ? "w-max items-center justify-center p-4" : "w-full items-center justify-center p-4"}  z-20 h-full gap-4 transition-transform duration-1000 ease-in-out`}
          style={{
            transform: `translateX(-${currentIndex * 30.5}%)`,
          }}
        >
          {data && data?.response?.length >= 1 ? (
            data?.response?.map((hotCourseAlgo: CourseTypeProps) => (
              <HotCourseCard hotCourseAlgo={hotCourseAlgo} key={hotCourseAlgo._id} />
            ))
          ) : (
            <div className="w-full">
              <Loader useSmallLoading={false} hSize="" />
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default memo(HotFreshCourses);
