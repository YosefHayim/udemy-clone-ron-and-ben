import { useState } from "react";
import SideBarProfile from "../SideBarProfile"; // Importando o componente da Sidebar

const NotificationPreferences = () => {
  // Estados para os switches de categorias
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [learningEnabled, setLearningEnabled] = useState(true);

  // Estados para os checkboxes
  const [preferences, setPreferences] = useState({
    productLaunches: true,
    offersPromotions: true,
    learningStats: true,
    inspiration: true,
    courseRecommendations: true,
    notificationsFromInstructors: true,
  });

  // Função para alternar categorias
  const toggleCategory = (category) => {
    if (category === "updates") {
      setUpdatesEnabled(!updatesEnabled);
    } else if (category === "learning") {
      setLearningEnabled(!learningEnabled);
    }
  };

  // Função para alternar os checkboxes
  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Função para salvar as alterações (simulação)
  const handleSave = () => {
    alert("Notification preferences saved!");
  };

  return (
    <main className="min-h-screen flex-1 border-l pt-4">
      <div className="mx-auto  rounded-lg">
        <div className="w-full border-b text-center">
          <h2 className="mb-2 font-sans text-2xl font-extrabold text-gray-800">
            Notification preferences
          </h2>
          <p className="mb-6 text-[1rem] text-gray-700">
            Manage the types of communications you receive.
          </p>
        </div>

        {/* Updates and Offerings */}
        <div className="mx-[10rem] my-[2rem] mb-10 border py-2">
          <div className="mb-4 flex items-center justify-between px-6">
            <h3 className="text-lg font-semibold text-gray-800">Updates and offerings</h3>
            <button
              onClick={() => toggleCategory("updates")}
              className={`flex h-6 w-12 items-center rounded-full p-1 ${
                updatesEnabled ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                  updatesEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <hr className="w-full" />

          {updatesEnabled && (
            <div className="space-y-4 px-6 py-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="productLaunches"
                  checked={preferences.productLaunches}
                  onChange={() => togglePreference("productLaunches")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="productLaunches" className="ml-3 text-sm text-gray-700">
                  Product launches and announcements
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="offersPromotions"
                  checked={preferences.offersPromotions}
                  onChange={() => togglePreference("offersPromotions")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="offersPromotions" className="ml-3 text-sm text-gray-700">
                  Offers and promotions
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Your Learning */}
        <div className="mx-[10rem] my-[2rem] mb-10 border py-2">
          <div className="mb-4 flex items-center justify-between px-6">
            <h3 className="text-lg font-semibold text-gray-800">Your learning</h3>
            <button
              onClick={() => toggleCategory("learning")}
              className={`flex h-6 w-12 items-center rounded-full p-1 ${
                learningEnabled ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                  learningEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <hr className="w-full" />

          {learningEnabled && (
            <div className="space-y-4 px-6 py-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="learningStats"
                  checked={preferences.learningStats}
                  onChange={() => togglePreference("learningStats")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="learningStats" className="ml-3 text-sm text-gray-700">
                  Learning stats
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inspiration"
                  checked={preferences.inspiration}
                  onChange={() => togglePreference("inspiration")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="inspiration" className="ml-3 text-sm text-gray-700">
                  Inspiration (tips, stories, etc.)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="courseRecommendations"
                  checked={preferences.courseRecommendations}
                  onChange={() => togglePreference("courseRecommendations")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="courseRecommendations" className="ml-3 text-sm text-gray-700">
                  Course recommendations
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notificationsFromInstructors"
                  checked={preferences.notificationsFromInstructors}
                  onChange={() => togglePreference("notificationsFromInstructors")}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="notificationsFromInstructors"
                  className="ml-3 text-sm text-gray-700"
                >
                  Notifications from instructors
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        <p className="mx-[10rem] -mt-4 mb-6 text-sm text-gray-600">
          Note: It may take a few hours for changes to be reflected in your preferences. You’ll
          still receive transactional emails related to your account and purchases if you
          unsubscribe.
        </p>

        {/* Save Button */}
        <div className="mx-[10rem] flex justify-start ">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-purple-600 px-6 py-2 text-[0.875rem] text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotificationPreferences;
