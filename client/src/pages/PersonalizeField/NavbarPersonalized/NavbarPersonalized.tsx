import Logo from "@/components/Logo/Logo";
import ChangeLanguage from "@/components/Navbar/DropDownMenu/ChangeLanguage/ChangeLanguage";
import { personalizeContent } from "@/routes/AppRoutes";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavbarPersonalized = () => {
  const personalizeTracking = useContext(personalizeContent);
  if (!personalizeTracking) throw new Error("No personalize tracking provided");
  const [personalizeData, setPersonalizeData] = personalizeTracking;

  return (
    <div>
      <div className="p-[1em] w-full flex flex-row items-center justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center gap-[0.5em] text-[#6d28d2]">
          <Link to="/">
            <button className="font-bold hover:bg-purpleHoverBtn py-[1em] px-[0.2em] rounded-[0.2em]">
              Save & Exit
            </button>
          </Link>
          <ChangeLanguage showIcon={false} />
        </div>
      </div>
      <div className="relative w-full h-[0.3em] bg-gray-300 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#6d28d2] transition-all duration-300"
          style={{ width: `${personalizeData.progressBar}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NavbarPersonalized;
