const TotalCourseLength: React.FC<{
  totalCourseLessons: number;
  totalCourseDuration: number;
  totalCourseSections: number;
}> = ({ totalCourseLessons, totalCourseDuration, totalCourseSections }) => {
  return (
    <div>
      <div className="flex w-[550px] justify-between mb-[0.5em]">
        <div className="flex flex-row gap-[0.5em]">
          <p>{totalCourseSections + 1} sections</p>
          <p>{totalCourseLessons} lectures</p>
          <p>{totalCourseDuration}h total length</p>
        </div>
        <button className="focus:outline-none border-none font-bold text-purpleStatic">
          Expand all sections
        </button>
      </div>
    </div>
  );
};

export default TotalCourseLength;
