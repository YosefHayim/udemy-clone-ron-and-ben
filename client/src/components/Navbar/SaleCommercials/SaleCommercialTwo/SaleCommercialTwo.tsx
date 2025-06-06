import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

const SaleCommercialTwo = () => {
  const [hiddenCommercial, setHiddenCommercial] = useState(
    localStorage.getItem("hiddenCommercial") === "true"
  );

  const handleCommercial = () => {
    setHiddenCommercial(true);
    localStorage.setItem("hiddenCommercial", "true");
  };

  return (
    <div
      className={`${
        hiddenCommercial ? "hidden" : "flex w-full flex-grow flex-wrap items-center justify-between"
      } ] bg-[#5022C2] p-2 text-center text-base text-white`}
    >
      <div className="flex flex-grow items-center justify-center gap-4 text-center">
        <p>
          <span className="font-sans font-extrabold">Future-ready skills on your schedule</span> |{" "}
          <span className="font-light underline">Learn on iOS, Android, and more.</span>
        </p>
      </div>
      <div className="">
        <button
          className="cursor-pointer rounded-[0.2em] border-none bg-none p-1 hover:bg-purple-300 focus:outline-none"
          onClick={handleCommercial}
        >
          <HiOutlineXMark className="text-[1.5em]" />
        </button>
      </div>
    </div>
  );
};

export default SaleCommercialTwo;
