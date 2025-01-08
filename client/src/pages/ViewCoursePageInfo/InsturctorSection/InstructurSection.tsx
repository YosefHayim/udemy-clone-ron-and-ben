import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import InstructorProfileImg from "./InstructorProfileImg/InstructorProfileImg";
import InstructorName from "./InstructorName/InstructorName";
import InstructorProfession from "./InstructorProfession/InstructorProfession";
import InstructorDescription from "./InstructorDescription/InstructorDescription";

const InstructorSection = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-[1em]">
      <div>
        <h2 className="font-bold text-[1.5em]">Instructor</h2>
        <InstructorName />
        <InstructorProfession />
      </div>
      <InstructorProfileImg />
      <InstructorDescription />
    </div>
  );
};

export default InstructorSection;