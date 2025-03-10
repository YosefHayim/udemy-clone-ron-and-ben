import InstructorRatings from "../InstructorRatings/InstructorRatings";

const InstructorProfileImg: React.FC<{
  instructorImg: string;
  instructorId: string;
}> = ({ instructorImg, instructorId }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-[2em]">
      <div>
        <img
          id={instructorId}
          src={instructorImg}
          alt="Instructor profile"
          className="rounded-[100em] h-[10em]"
        />
      </div>
      <InstructorRatings />
    </div>
  );
};

export default InstructorProfileImg;
