import RatingAvg from "../../StudentsAlsoBought/RatingAvg/RatingAvg";
import { LuDot } from "react-icons/lu";

const ReviewSectionTitle = ({ totalRated, avgRating }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-[0.2em] text-[1.5em] font-bold">
      <h2>
        <RatingAvg
          textSize=""
          flexChosen={"flex flex-row-reverse items-center"}
          avgRating={avgRating}
        />
      </h2>
      <h2>course rating</h2>
      <LuDot className="text-gray-500 text-[1.5em]" />
      <h2>{totalRated} ratings</h2>
    </div>
  );
};

export default ReviewSectionTitle;