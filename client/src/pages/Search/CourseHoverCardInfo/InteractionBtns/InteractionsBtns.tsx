import AddToCart from "./AddToCart/AddToCart";
import HeartBtn from "./HeartBtn/HeartBtn";

const InteractionsBtns = ({ courseId, coursePrice, fullPriceCourse }) => {
  if (!courseId && !coursePrice) {
    return;
  }

  return (
    <div className="flex items-center justify-start w-full gap-[0.5em] mt-[1em]">
      <AddToCart
        courseId={courseId}
        coursePrice={coursePrice}
        fullPriceCourse={fullPriceCourse}
      />
      <HeartBtn iconSize={"2em"} courseId={courseId} />
    </div>
  );
};

export default InteractionsBtns;
