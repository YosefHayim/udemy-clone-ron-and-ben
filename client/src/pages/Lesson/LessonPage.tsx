import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import course from "@/db";
import LessonRoutes from "../../routes/LessonRoutes";
import VideoPlayer from "./VideoPlayer";
import Footer from "@/pages/Home/Footer";


const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the lesson ID from the route params

  // Find the lesson in the course database
  const lesson = course.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.id === id);

  if (!lesson) {
    return (
      <Layout>
        <div>
          <h1>Lesson Not Found</h1>
          <p>The requested lesson could not be found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
        {/* Use the VideoPlayer component */}
        <VideoPlayer videoUrl={lesson.videoUrl} />
      <LessonRoutes />
      <Footer />

    </Layout>
  );
};

export default LessonPage;
