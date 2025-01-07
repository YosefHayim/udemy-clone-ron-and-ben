import { MdOutlineStarPurple500 } from "react-icons/md";

const CourseRating = ({ courseRating = 4.1, amountOfStars = 1 }) => {
  return (
    <div className="flex items-center gap-[0.1em]">
      <b className="text-[#f69c08]">{courseRating}</b>
      {/* Dynamically render stars */}
      {Array(amountOfStars)
        .fill(null)
        .map((_, index) => (
          <MdOutlineStarPurple500 key={index} className="text-[#f69c08]" />
        ))}
    </div>
  );
};

export default CourseRating;