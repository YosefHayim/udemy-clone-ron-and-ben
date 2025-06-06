import Filter from "@/components/Filter/Filter";
import { languages } from "@/utils/languages";
import { useState } from "react";

const Subtitles = () => {
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <div>
      <Filter
        filterTitle={"Subtitles"}
        filterItems={languages}
        chosenHeight={"h-[50px]"}
        display={display}
        setDisplay={setDisplay}
        useForSection={false}
        showLine={true}
        hideIcons={false}
      />
    </div>
  );
};

export default Subtitles;
