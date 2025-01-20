import SearchCourseCard from "@/pages/Search/SearchCourseCard/SearchCourseCard";
import SidebarFilter from "./SidebarFilter/SidebarFilter";
import FilterNSort from "./SidebarFilter/FilterNSort/FilterNSort";
import Pagination from "./PaginationPages/PaginationPages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getAllCourses from "@/api/courses/getAllCourses";
import Loader from "@/components/Loader/Loader";
import Commercial from "./Commercial/Commercial";
import HotFreshCourses from "./HotFreshCourses/HotFreshCourses";
import React, { useContext, useState } from "react";
import CourseHoverCardInfo from "./CourseHoverCardInfo/CourseHoverCardInfo";
import { CourseTypeProps } from "@/types/types";
import { filterContext } from "@/routes/AppRoutes";

const SearchPage: React.FC = () => {
  const [filterData, setFilterData] = useContext(filterContext);

  document.title = "Search results | Udemy";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const searchTerm: string | null = searchParams.get("q")?.toLowerCase() || "";
  const limit = null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", searchTerm?.toLowerCase(), currentPage],
    queryFn: () => {
      if (!searchTerm && !currentPage && !limit) {
        throw new Error("Course ID is undefined");
      }
      return getAllCourses(
        searchTerm || "",
        currentPage || 1,
        limit || 100 || filterData
      );
    },
    enabled: !!searchTerm,
  });

  if (isLoading) {
    return <Loader hSize="" useSmallLoading={false} />;
  }

  if (error) {
    navigate("/error-not-found");
  }

  return (
    <div className="flex flex-col w-full gap-[1em] px-6 py-[3em]">
      <h1 className="font-bold text-[1.8em] w-full mb-[0.8em]">
        {data?.totalCourses || 0} results for "{searchTerm}"
      </h1>
      <FilterNSort totalResults={data.totalCourses || 0} />
      <div className="flex flex-row justify-start w-full gap-[1.5em]">
        <div>
          <SidebarFilter />
        </div>
        <div>
          <div>
            {data?.response
              ?.slice(0, 18)
              .map((course: CourseTypeProps, index: number) => (
                <div
                  key={course._id}
                  id={`course-card-${course._id}`}
                  className="relative"
                  onMouseEnter={() => setHoveredCourse(course._id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <SearchCourseCard course={course} />
                  {hoveredCourse === course._id && (
                    <div className="absolute top-full left-0 z-[1000] p-[2em]">
                      <CourseHoverCardInfo
                        whatYouWillLearn={course.whatYouWillLearn}
                        courseId={course._id}
                        fullPriceCourse={course.courseFullPrice}
                        coursePrice={course.courseDiscountPrice}
                      />
                    </div>
                  )}
                  {index === 2 && <Commercial key="commercial" />}
                  {index === 6 && <HotFreshCourses key="hotfreshcourses" />}
                </div>
              ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage || 1}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SearchPage;
