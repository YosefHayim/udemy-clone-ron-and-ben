import CourseInstructor from '@/components/CourseCard/CourseInstructor/CourseInstructor';
import CourseTitle from '@/components/CourseCard/CourseTitle/CourseTitle';
import { BsFillTagFill } from 'react-icons/bs';
import CourseTag from '@/components/CourseCard/CourseTag/CourseTag';
import CourseLength from '@/pages/ViewCoursePageInfo/MoreCoursesByInstructor/CourseLength/CourseLength';
import CourseRatings from '@/components/CourseCard/CourseRatings/CourseRatings';
import { useQuery } from '@tanstack/react-query';
import getCourseCartInfoByCourseId from '@/api/courses/getCourseCartInfoByCourseId';
import { useDispatch } from 'react-redux';
import { removeCourseFromCart } from '@/redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlay } from 'react-icons/fa6';
import OptionsMyLearning from './OptionsMyLearning/OptionsMyLearning';

const ItemInCart = ({
  isFontThick = false,
  rowPrices = true,
  courseId = '',
  courseImgSize = 'h-[5em] rounded-[0.3em]',
  hide = true,
  shortCutInstructor = false,
  shortcutTitle = false,
  chooseFlex = 'flex-row',
  itemsPosition = 'center',
  textColor = 'text-[#a435f0]',
  showDisPrice = false,
  showHR = true,
  showInstructor = true,
  showFullPrice = true,
  isColCourseBox = false,
  textSize = '',
  gapPrice = 'gap-[1em]',
  width = 'w-full',
  isMyLearning = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => {
      if (!courseId) {
        throw new Error('Course ID is undefined');
      }
      return getCourseCartInfoByCourseId(courseId);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (!courseId) {
    console.log('There is no course Id provided');
    return;
  }

  const handleCourseView = (courseId: string): void => {
    navigate(`/course-view/${courseId}`);
  };

  const handleRemove = () => {
    dispatch(
      removeCourseFromCart({
        courseId,
        originalPrice: data?.courseFullPrice || 0,
        discountPrice: data?.courseDiscountPrice || 0,
      })
    );
  };

  const handlePreformOperation = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const btnType = target.tagName === 'BUTTON';
    if (btnType && target.textContent === 'Remove') {
      handleRemove();
    } else if (btnType && target.textContent === 'Save for Later') {
      console.log('Save for Later clicked');
    } else if (btnType && target.textContent === 'Move to Wishlist') {
      console.log('Move to Wishlist clicked');
    } else if (!btnType) {
      navigate(`/course-view/${courseId}`);
    }
  };

  if (error && !data) {
    navigate('/not/found');
  }

  if (isPending) {
    <div></div>;
  }

  return (
    <div id={courseId} className={`p-[1em] ${width} ${textSize}`} onClick={handlePreformOperation}>
      <div
        id={courseId}
        className={`flex ${
          isColCourseBox ? 'flex-col' : 'flex-row'
        } w-full cursor-pointer items-start justify-start gap-[1em]`}
      >
        <div>
          <div className="relative">
            <img
              id={courseId}
              src={data?.courseImg}
              alt={`${data?.courseName} image`}
              className={`${courseImgSize}`}
            />
            <div
              className={
                isMyLearning
                  ? `absolute top-0 h-full w-full opacity-[80%] hover:bg-black`
                  : `hidden`
              }
            >
              <FaCirclePlay
                className={`${
                  isMyLearning
                    ? 'text:none absolute left-[38%] top-[35%] text-[3em] hover:text-white'
                    : 'hidden'
                }`}
              />
              <div
                className={
                  isMyLearning
                    ? `absolute right-[5%] top-[5%] flex h-[2em] items-center rounded-[0.2em] bg-white p-[0.5em] hover:bg-gray-100`
                    : `hidden`
                }
              >
                <OptionsMyLearning />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${chooseFlex} flex flex-row items-${itemsPosition} justify-center ${gapPrice}`}
        >
          <div className="flex w-[220px] flex-col items-start gap-[0.5em]">
            <CourseTitle title={data?.courseName} shortcutTitle={shortcutTitle} />
            <div className={`${showInstructor ? 'block' : 'hidden'}`}>
              <CourseInstructor
                instructor={data?.courseInstructor.fullName}
                shortCutInstructor={shortCutInstructor}
              />
            </div>
            <div className="flex flex-row items-start justify-start gap-[1em]">
              <div className={hide ? 'block' : 'hidden'}>
                <CourseTag tagName={data?.courseTag} />
              </div>
              <div className={hide ? 'block' : 'hidden'}>
                <CourseRatings
                  stars=""
                  avgRatings={data?.averageRating}
                  totalRatings={data?.totalRatings}
                />
              </div>
            </div>
            <div className={hide ? 'block' : 'hidden'}>
              <CourseLength
                courseLevel={data?.courseLevel}
                totalLectures={data?.totalCourseLessons}
                totalMinutes={data?.totalCourseDuration}
              />
            </div>
          </div>
          <div className={hide ? 'block' : 'hidden'}>
            <div className="flex flex-col items-start text-purpleStatic">
              <button className=" rounded-[0.3em] p-[0.3em] hover:bg-purple-200 focus:outline-none">
                Remove
              </button>
              <button className=" rounded-[0.3em] p-[0.3em] hover:bg-purple-200 focus:outline-none">
                Save for Later
              </button>
              <button className=" rounded-[0.3em] p-[0.3em] hover:bg-purple-200 focus:outline-none">
                Move to Wishlist
              </button>
            </div>
          </div>
          <div>
            <div className={`flex flex-row items-center justify-center gap-[0.2em] ${textColor}`}>
              <div className="flex flex-col items-start justify-start">
                <div className={hide ? 'flex flex-row items-center gap-[0.2em]' : 'hidden'}>
                  <b>₪{data?.courseDiscountPrice}</b>
                  <BsFillTagFill />
                </div>
                <div
                  className={`${
                    rowPrices
                      ? 'flex flex-row font-sans font-extrabold'
                      : 'flex flex-col font-light text-black'
                  }  items-start gap-[0.4em]`}
                >
                  <p>{data && showDisPrice ? `₪${data?.courseDiscountPrice}` : ''}</p>
                  <p
                    className={
                      showFullPrice
                        ? `${isFontThick && 'font-light'} text-gray-600 line-through`
                        : `hidden`
                    }
                  >
                    ₪{data?.courseFullPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[-1em] mt-[0.5em]">
        <hr className={`${showHR ? 'block' : 'hidden'} relative w-full`} />
      </div>
    </div>
  );
};

export default ItemInCart;
