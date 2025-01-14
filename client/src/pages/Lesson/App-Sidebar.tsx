import { useSidebar } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { CourseSidebarMenu } from "./CourseSliderBarMenu";
import CustomTrigger from "../Lesson/CustomTrigger";
import { fetchCourseById } from "@/services/courseService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AppSidebar() {
  const [courseData, setCourseData] = useState<any>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { toggleSidebar, open } = useSidebar();
  const { courseId } = useParams<{ courseId: string }>(); // Retrieve courseId from the URL

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1000; // Adjust threshold as needed
      setIsSmallScreen(isSmall);

      // Automatically close the sidebar if the screen is small
      if (isSmall && open) {
        toggleSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [open, toggleSidebar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!courseId) {
          console.error("Missing courseId in the route.");
          return;
        }

        const data = await fetchCourseById(courseId);
        setCourseData(data.data);
      } catch (error) {
        console.error("Failed to fetch course data.", error);
      }
    };
    fetchData();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar className="absolute min-h-full top-[69px] bg-white" side="left">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <CourseSidebarMenu sections={courseData.sections} courseId={courseId} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Centered Trigger */}
    </>
  );
}
