import { categories } from "@/utils/categoriesOfCoursesNavbarHover";
import { searchAlgoLocalStorage } from "@/utils/searchesOfUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index: number): void => {
    setActiveCategory(index);
  };

  const handleMouseLeave = (): void => {
    setActiveCategory(null);
  };

  const getArrowPosition = (index: number): number => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".menu-button");
    if (buttons[index]) {
      const rect = buttons[index].getBoundingClientRect();
      return rect.left + rect.width / 2.5;
    }
    return 0;
  };

  const handleNavigate = (category: string) => {
    navigate(`/courses/search?src=ukw&q=${encodeURIComponent(category.toLowerCase())}`);
    searchAlgoLocalStorage(category.toLowerCase());
  };
  return (
    <div className="border-t-[1px] border-t-gray-200 font-sans text-[0.87rem]">
      <hr />
      <div className="relative z-20 bg-white shadow-md" onMouseLeave={handleMouseLeave}>
        <div className="flex items-center justify-center space-x-[1.6rem] py-[0.8rem]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <button
                className="menu-button text-gray-800 text-opacity-90 hover:text-purple-700 focus:outline-none"
                onClick={() => handleNavigate(category.title)}
              >
                {category.title}
              </button>
            </div>
          ))}
        </div>

        {/* Black Submenu */}
        {activeCategory !== null && (
          <div
            className="absolute left-0 top-full z-30 w-screen bg-black py-4 text-white"
            onMouseLeave={handleMouseLeave}
          >
            {/* Black Arrow */}
            <div
              className="absolute top-[-8px] h-0 w-0 border-b-8 border-l-8 border-r-8 border-b-black border-l-transparent border-r-transparent"
              style={{
                left: `${getArrowPosition(activeCategory)}px`,
              }}
            ></div>

            {/* Submenu Items */}
            <div className="mx-auto flex w-full max-w-screen-xl justify-center space-x-8 text-[0.85rem]">
              {categories[activeCategory]?.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:text-purple-200"
                  onClick={() => handleNavigate(subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
