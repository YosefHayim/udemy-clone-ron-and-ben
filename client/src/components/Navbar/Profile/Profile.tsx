import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/index"; // Import RootState type for Redux

const Profile: React.FC = () => {
  // Access the user state from Redux
  const userProfileImg = useSelector(
    (state: RootState) => state.user.profilePic
  );

  // Extract the first initial from the user's email
  const getInitial = (email: string | undefined) => {
    if (!email) return "?"; // Default initial if email is missing

    console.log(email.charAt(0).toUpperCase()); // Logs the initial to the console for debugging
    return email.charAt(0).toUpperCase(); // Returns the first character and makes it uppercase
  };

  return (
    <div
      className="flex items-center justify-center bg-black text-white font-bold rounded-full"
      style={{
        width: "32px", // Width of the circle
        height: "32px", // Height of the circle
      }}
    >
      <img src={{ userProfileImg }} alt="" />
    </div>
  );
};

export default Profile;
