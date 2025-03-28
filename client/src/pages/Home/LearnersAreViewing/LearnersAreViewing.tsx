import { useQuery } from '@tanstack/react-query';
import getAllCourses from '@/api/courses/getAllCourses';
import { useState } from 'react';
import HomeCourseCard from '@/components/HomeCourseCard/HomeCourseCard';
import ButtonsCarousel from '@/components/ButtonsCarousel/ButtonsCarousel';
import { CourseTypeProps } from '@/types/types';
import Loader from '@/components/Loader/Loader';

const LearnersAreViewing = () => {
  const [courseIndex, setCourseIndex] = useState(0);
  const [isCourseAnimating, setCourseAnimating] = useState(false);
  const [countCourseClick, setCourseClick] = useState(0);
  const convertArrayStringToRegArray = JSON.parse(localStorage.getItem('searchesOfUser'));
  const [arrayAlgo, setArrayAlgo] = useState(convertArrayStringToRegArray);

  const randomAlgoWord = arrayAlgo[Math.floor(Math.random() * arrayAlgo.length)];

  const { data, isLoading, isPending } = useQuery({
    queryKey: [`${randomAlgoWord}`, randomAlgoWord],
    queryFn: () => getAllCourses(randomAlgoWord),
    enabled: !!randomAlgoWord,
  });

  const handlePrevCourse = () => {
    if (isCourseAnimating || courseIndex === 0) return;
    setCourseAnimating(true);
    setCourseClick((prevCount) => prevCount - 1);
    setCourseIndex((prevIndex) => prevIndex - 1);
    setTimeout(() => setCourseAnimating(false), 500);
  };

  const handleNextCourse = () => {
    if (isCourseAnimating) return;
    setCourseClick((prevCount) => prevCount + 1);
    setCourseAnimating(true);
    setCourseIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setCourseAnimating(false), 500);
  };

  if (isLoading || isPending) {
    return <Loader useSmallLoading={false} hSize="" />;
  }

  return (
    <div className="px-6 py-8">
      <h2 className="mb-6 font-sans text-3xl font-extrabold">Learners are viewing</h2>
      <div className="relative w-full overflow-hidden">
        {data.response && data?.response?.length > 7 && (
          <ButtonsCarousel
            handleFnNext={handleNextCourse}
            handleFnPrev={handlePrevCourse}
            state={countCourseClick}
            useCustom={true}
            showDirectionalButtonsOnlyOnEdge={false}
            topPosition="40%"
            leftPosition="1%"
            rightPosition="2%"
          />
        )}
        <div
          className={`flex ${data?.response && data?.response?.length > 7 ? 'w-max items-center justify-center' : 'w-full items-center justify-start'}  z-20 h-full gap-4 transition-transform duration-1000 ease-in-out`}
          style={{
            transform: `translateX(-${courseIndex * 30.5}%)`,
          }}
        >
          {data.response &&
            data.response?.length > 1 &&
            data.response.map((courseCard: CourseTypeProps, index: number) => (
              <HomeCourseCard courseCard={courseCard} index={index} key={courseCard?._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LearnersAreViewing;
