import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSecurity from "./SwitchPagesProfile/AccountSecurity";
import ApiClients from "./SwitchPagesProfile/ApiClients";
import CloseAccount from "./SwitchPagesProfile/CloseAccount";
import NotificationPreferences from "./SwitchPagesProfile/NotificationPreferences";
import Photo from "./SwitchPagesProfile/Photo";
import Privacy from "./SwitchPagesProfile/Privacy";
import SideBarProfile from "./SideBarProfile";
import ProfileMain from "./SwitchPagesProfile/ProfileMain";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader/Loader";

const ProfilePage = () => {
  const [selectedPage, setSelectedPage] = useState("Profile");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (selectedPage === "Subscriptions") {
        navigate("/user/manage-subscriptions", { replace: true });
      }
      if (selectedPage === "View public profile") {
        navigate("/user/public-profile", { replace: true });
      }
      if (selectedPage === "Payment Methods") {
        navigate("/user/edit-payment-methods/", { replace: true });
      }
    }, 1000);
  }, [selectedPage]);

  const renderComponent = () => {
    switch (selectedPage) {
      case "Profile":
        return <ProfileMain />;
      case "Photo":
        return <Photo />;
      case "Account Security":
        return <AccountSecurity />;
      case "Privacy":
        return <Privacy />;
      case "Notification Preferences":
        return <NotificationPreferences />;
      case "API Clients":
        return <ApiClients />;
      case "Close Account":
        return <CloseAccount />;
      default:
        return <ProfileMain />;
    }
  };
  return (
    <div className="mx-[12rem] my-6 flex border-[1px] border-gray-300">
      <SideBarProfile selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader hSize="100" useSmallLoading={false} />
        </div>
      ) : (
        <div className="flex-1">{renderComponent()}</div>
      )}
    </div>
  );
};

export default ProfilePage;
