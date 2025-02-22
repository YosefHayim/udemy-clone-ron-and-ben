import { IoFilterOutline } from "react-icons/io5";

const FilterBtn = () => {
  return (
    <div className="h-[5em] flex items-center px-[0.5em] py-[1em] border border-black rounded-[0.2em] w-min cursor-pointer gap-[0.1em] hover:bg-hoverDivGray">
      <div>
        <IoFilterOutline />
      </div>
      <div>
        <b className="font-bold text-base leading-[1.2] ml-[0.4em]">Filter </b>
      </div>
      <div>
        <b></b>
      </div>
    </div>
  );
};

export default FilterBtn;
