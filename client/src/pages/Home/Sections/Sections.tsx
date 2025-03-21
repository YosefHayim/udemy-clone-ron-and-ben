import { btnStyleNHover } from "@/utils/stylesStorage";
import { useEffect, useState } from "react";
import { categoriesData } from "@/utils/categoriesData";
import { navbarCategories } from "@/utils/navbarCategories";
import { getRandomLearnersAmount } from "@/utils/randomLearnersAmount";
import { topics } from "@/utils/topics";
import ButtonsCarousel from "@/components/ButtonsCarousel/ButtonsCarousel";
import { useQuery } from "@tanstack/react-query";
import getAllCourses from "@/api/courses/getAllCourses";

const Sections = () => {
  const [navbarCategory, setNavbarCategory] = useState("Data Science");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [countClick, setCountClick] = useState(0);

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCountClick((prevCount) => prevCount - 1);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setCountClick((prevCount) => prevCount + 1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getDefaultTopic = () => {
    for (let category of categoriesData) {
      const match = category?.subcategory?.find((sub) => {
        sub?.title || sub?.name === navbarCategory;
      });
      if (match) {
        return match.topics?.[0] || null;
      }
    }
    return null;
  };

  const [choseTopic, setChooseTopic] = useState(getDefaultTopic());

  const { data, isLoading, error, isPending } = useQuery({
    queryKey: ["courses", choseTopic],
    queryFn: () => getAllCourses(choseTopic),
    enabled: !!choseTopic,
  });

  useEffect(() => {
    const newDefault = getDefaultTopic();
    if (newDefault) setChooseTopic(newDefault);
  }, [navbarCategory]);

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="flex w-full flex-col items-start justify-start  px-5">
        <h1 className="mt-12 w-full text-3xl font-bold text-gray-900">
          All the skills you need in one place
        </h1>
        <p className="mb-6 mt-2 w-full text-base text-gray-600">
          From critical skills to technical topics, Udemy supports your
          professional development.
        </p>
        <div className="flex w-full items-center justify-start gap-5 ">
          {navbarCategories.map((category, index) => (
            <div
              onClick={() => setNavbarCategory(category)}
              className="w-min-max cursor-pointer flex-col items-center justify-center text-base"
              key={index}
            >
              <b
                className={`${category === navbarCategory ? "text-black" : "text-gray-600"}`}
              >
                {category}
              </b>
              <hr
                className={`${category === navbarCategory ? "w-min-max h-[0.1em] bg-black" : "hidden"}`}
              />
            </div>
          ))}
        </div>
        <hr className="w-full" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-gray-100 p-5">
        <div className="flex w-full">
          <ButtonsCarousel
            handleFnNext={handleNext}
            handleFnPrev={handlePrev}
            state={countClick}
            useCustom={true}
            topPosition="67%"
            leftPosition="1%"
            rightPosition="2%"
          />
          <div className="mt-3 flex w-full">
            {categoriesData.map((category, i) => {
              const match = category?.subcategory.find(
                (sub) => sub?.title === navbarCategory,
              );
              if (!match) return null;
              return (
                <div
                  key={i}
                  className={`flex w-max items-center justify-center gap-2 transition-transform duration-1000 ease-in-out`}
                  style={{
                    transform: `translateX(-${currentIndex * 18}%)`,
                  }}
                >
                  {match?.topics?.map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() => setChooseTopic(topic)}
                      className={`${
                        choseTopic === topic
                          ? "w-full bg-[#303141] text-white hover:bg-[#595c73]"
                          : ""
                      } flex w-max cursor-pointer flex-col items-start justify-start rounded-full bg-[#e9eaf2] p-5 text-blackUdemy hover:bg-grayUdemy`}
                    >
                      <b className="w-max text-base">{topic}</b>

                      {idx < topics.length - 1 ? (
                        <p>{getRandomLearnersAmount()}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data?.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-lg border bg-white shadow-sm"
            >
              <img
                src={course.courseImg}
                alt={course.courseName}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="truncate text-lg font-bold text-gray-900">
                  {course.courseName}
                </h3>
                <p className="truncate text-sm text-gray-600">
                  {course.courseInstructor.fullName}
                </p>
                <div className="mt-2 flex items-center text-sm text-yellow-500">
                  <span>{course.averageRating}</span>
                  <span className="ml-1 text-gray-500">
                    ({course.totalRatings})
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-gray-900">
                      ₪{course.courseDiscountPrice}
                    </span>
                    {course.courseFullPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₪{course.courseFullPrice}
                      </span>
                    )}
                  </div>
                  {course.courseTag === "Bestseller" && (
                    <span className="rounded-full bg-yellow-200 px-2 py-1 text-sm text-yellow-800">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-8 w-full">
          <button
            className={`${btnStyleNHover} border border-purple-800 font-bold text-purple-800`}
          >
            Show all {navbarCategory} courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sections;
