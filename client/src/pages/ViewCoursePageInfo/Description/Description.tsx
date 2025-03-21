import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const Description: React.FC<{ description: string; whoThisFor: string[] }> = ({
  description,
  whoThisFor,
}) => {
  const [isExpanded, setExpanded] = useState(true);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex w-[680px] flex-col items-start justify-start">
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded ? "none" : "280px",
          WebkitMaskImage: isExpanded
            ? "none"
            : "linear-gradient(#ffffff, #ffffff, rgba(255, 255, 255, 0))",
          maskImage: isExpanded
            ? "none"
            : "linear-gradient(#ffffff, #ffffff, rgba(255, 255, 255, 0))",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div className="flex flex-col gap-[1em]">
          <h2 className="font-sans text-[1.2em] font-extrabold">Description</h2>
          <p className=" mb-[2em]">{description}</p>
        </div>
        <ul className="flex  list-disc flex-col items-start justify-start gap-[0.5em]">
          <li>Learn the basics of Semiconductors.</li>
          <li>Which materials are used as Semiconductors.</li>
          <li>
            Energy Band concept and classification of materials w.r.t. this
            concept.
          </li>
          <li>
            Thorough discussion on Intrinsic and Extrinsic semiconductors.
          </li>
          <li>
            Detailed discussion on Fermi-Dirac distribution and Fermi level. It
            is a very important concept and helps students further clarify the
            understanding of semiconductors.
          </li>
          <li>
            Thorough discussion on electron concentration with mathematical
            expressions.
          </li>
          <li>
            Thorough discussion on hole concentration with mathematical
            expressions.
          </li>
          <li>
            Quiz questions have also been included for clarifying concepts.
          </li>
          <li>
            Discussion on thermal equilibrium and Mass Action Law for intrinsic
            semiconductors.
          </li>
          <li>
            Concept of intrinsic carrier concentration and derivation of its
            mathematical expression.
          </li>
          <li>Identification of Fermi level for an intrinsic semiconductor.</li>
          <li>
            Relation among drift velocity, current density, and conductivity for
            a semiconductor material.
          </li>
          <li>
            Discussion on frequently asked questions regarding Semiconductors.
          </li>
          <li>
            Detailed discussion on the topic will help students to crack
            different competitive examinations.
          </li>
        </ul>
        <div className="mt-[1.5em]">
          <h2 className="font-sans text-[1.5em] font-extrabold">
            Who is this course for?:
          </h2>
          <ul className=" list-disc">
            <li>{whoThisFor}</li>
          </ul>
        </div>
      </div>
      <div
        className="mt-[1em] flex cursor-pointer items-center gap-[1em]"
        onClick={handleToggle}
      >
        <span className="font-sans font-extrabold text-purpleStatic hover:text-purpleHover ">
          {isExpanded ? "Show less" : "Show more"}
        </span>
        {isExpanded ? (
          <MdOutlineKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}
      </div>
    </div>
  );
};

export default Description;
