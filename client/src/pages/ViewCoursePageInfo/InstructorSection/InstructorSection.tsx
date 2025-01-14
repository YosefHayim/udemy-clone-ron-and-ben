import InstructorProfileImg from "./InstructorProfileImg/InstructorProfileImg";
import InstructorName from "./InstructorName/InstructorName";
import InstructorProfession from "./InstructorProfession/InstructorProfession";
import InstructorDescription from "./InstructorDescription/InstructorDescription";

const InstructorSection = ({
  instructorImg,
  instructorName,
  descriptionInstructor,
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-[1em]">
      <div>
        <h2 className="font-bold text-[1.5em]">Instructor</h2>
        <InstructorName instructorName={instructorName} />
        <InstructorProfession />
      </div>
      <InstructorProfileImg instructorImg={instructorImg} />
      <InstructorDescription descriptionInstructor={descriptionInstructor} />
    </div>
  );
};

export default InstructorSection;
