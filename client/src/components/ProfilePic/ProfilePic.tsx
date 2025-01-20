import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginBtn from "../Navbar/LoginBtn/LoginBtn";
import SignupBtn from "../Navbar/SignupBtn/SignupBtn";
import Language from "../Navbar/Language/Language";
import Cookies from "js-cookie";
import { useEffect } from "react";

const ProfilePic: React.FC<{ shortcutName: string; profilePic: string }> = ({
  shortcutName,
  profilePic,
}) => {
  const cookie = Cookies.get("cookie");

  if (!cookie) {
    return (
      <div className="flex flex-row gap-[1em]">
        <LoginBtn />
        <SignupBtn />
        <Language />
      </div>
    );
  }

  useEffect(() => {}, [cookie]);

  return (
    <Avatar>
      <AvatarImage src={profilePic} />
      <AvatarFallback className="bg-black text-white font-bold">
        {shortcutName.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePic;
