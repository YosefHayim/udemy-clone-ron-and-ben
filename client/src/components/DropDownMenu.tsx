import React from "react";
import { FaGlobe, FaExternalLinkAlt } from "react-icons/fa"; // Importa ícones
import { MdLanguage } from "react-icons/md";
import ProfilePic from "./ProfilePic/ProfilePic";
import { useSelector } from "react-redux";

const DropdownMenu: React.FC = () => {
  // Accessing Redux state for user data
  const fullName = useSelector((state: any) => state.user.fullName);
  const profilePic = useSelector((state: any) => state.user.profilePic);
  const email = useSelector((state: any) => state.user.email);

  // Split fullName safely, handle case when fullName is empty or undefined
  const [firstWord, secondWord] = fullName?.split(" ") || ["", ""];

  // Safely generate shortcutName using first and second word initials
  const shortcutName =
    (firstWord?.[0]?.toUpperCase() || "") + (secondWord?.[0]?.toUpperCase() || "");

  if (!fullName && !profilePic && !email) {
    return null; // Return null if essential data is missing
  }

  return (
    <div className="absolute z-30 right-0 mt-2 w-72 bg-white border border-gray-300 shadow-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
      <div className="flex items-center p-4 border-b">
        <ProfilePic shortcutName={shortcutName} profilePic={profilePic} />
        <div className="ml-3">
          <div className="font-bold text-gray-800">{fullName}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
      {/* Menu Items */}
      <ul className="py-2 text-sm">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My learning
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My cart
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Wishlist
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Teach on Udemy
          </a>
        </li>
        <hr />
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Notifications
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Messages
          </a>
        </li>
        <hr />
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Account settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Payment methods
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Subscriptions
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Udemy credits
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Purchase history
          </a>
        </li>
        <hr />
        <li>
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="text-sm">Language</span>
            <span className="ml-auto mr-2 text-sm">English</span>
            <MdLanguage className="text-lg" />
          </div>
        </li>

        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Public profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Edit profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Help and Support
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Log out
          </a>
        </li>
        <hr />
        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
          <div className="flex items-center justify-between">
            <span>Udemy Business</span>
            <FaExternalLinkAlt />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Bring learning to your company
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
