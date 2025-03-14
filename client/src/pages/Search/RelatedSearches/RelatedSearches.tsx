import { IoIosInformationCircle } from "react-icons/io";
import RelatedSearchAlgoBtn from "./RelatedSearchAlgoBtn/RelatedSearchAlgoBtn";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const RelatedSearches = () => {
  const [searchParams] = useSearchParams();
  const urlSearchTerm: string = searchParams.get("q")?.toLowerCase() || "";

  const [suggestions, setSuggestions] = useState([]);
  const [isHover, setIsHover] = useState(false);

  const fetchSuggestions = useCallback(async () => {
    if (urlSearchTerm.length > 1) {
      try {
        const response = await axios.get(
          `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(
            urlSearchTerm
          )}&max=10`
        );
        setSuggestions(response.data.map((item: any) => item.word));
      } catch (error) {
        console.log("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  }, [urlSearchTerm]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-[1em] mt-[2em]">
      <div className="w-full flex flex-row items-center justify-start gap-[0.5em]">
        <b className="font-bold text-[1.2em]">Related searches</b>
        <div className="relative">
          <div
            className="bg-none border-none shadow-none hover:bg-none hover:shadow-none"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <IoIosInformationCircle className="text-[1.5em]" />
          </div>
          {isHover && (
            <div className="absolute  top-[-10%] left-[130%] bg-white text-black w-[250px] p-[1.5em] border border-gray-150 shadow-alertAlgoInfo rounded-md">
              <b>About these results</b>
              <p>
                Explore results for similar search terms from students like you.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row w-full flex-wrap gap-[0.8em]">
        {suggestions.map((suggestion) => (
          <RelatedSearchAlgoBtn key={suggestion} algoSearch={suggestion} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSearches;
