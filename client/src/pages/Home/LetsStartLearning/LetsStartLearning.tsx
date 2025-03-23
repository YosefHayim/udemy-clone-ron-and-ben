import { btnStyleNHover } from "@/utils/stylesStorage";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

const LetsStartLearning = () => {
  return (
    <div className="pl-4 font-extrabold">
      <div className="flex w-full flex-row items-center justify-between">
        <h1>Let's start learning</h1>
        <div>
          <button
            className={`${btnStyleNHover} rounded-md px-3 py-3 font-sans text-xs font-bold text-purple-700 underline`}
          >
            My learning
          </button>
        </div>
      </div>
      {/* // Start a new streak */}
      <div className="flex w-full items-center justify-around border border-gray-300">
        <div className="flex w-full flex-col items-center justify-start text-start">
          <h2>
            <b>Start a new streak</b>
          </h2>
          <p>We know you have it in you. Go after your goals!</p>
        </div>
        <div className="flex w-full items-center justify-start">
          <MdOutlineLocalFireDepartment />
          <div className="flex w-full flex-col items-center justify-start">
            <p>
              <b>0</b>Weeks
            </p>
            <p className="font-light text-gray-300">Current streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsStartLearning;
