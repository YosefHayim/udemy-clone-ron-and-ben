import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/404/NotFound";
import LessonPage from "../pages/Lesson/LessonPage";
import SearchPage from "@/pages/Search/SearchPage";
import Homepage from "@/pages/Home/Homepage";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/pages/Home/Footer";
import ViewCoursePageInfo from "@/pages/ViewCoursePageInfo/ViewCoursePageInfo";
import Loader from "@/components/Loader/Loader";
import ShoppingCart from "@/pages/ShoppingCart/ShoppingCart";
import SignUp from "@/pages/SignUp/Signup";
import Login from "@/pages/Login/Login";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes where Navbar is shodsdswn */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/loader" element={<Loader />} />
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/courses/search" element={<SearchPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/course-view/:courseId"
                  element={<ViewCoursePageInfo />}
                />
              </Routes>
              <Footer />
            </>
          }
        />
        {/* Route where Header is hidden */}
        <Route
          path="/lesson/:id/*"
          element={
            <>
              <LessonPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
