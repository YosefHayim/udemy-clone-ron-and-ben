import { axiosClient, baseUrl, isProduction, localhostUrl } from '../configuration';

type fn = (courseId: string) => Promise<any>;

const getCourseCartInfoByCourseId: fn = async (courseId: string) => {
  if (!courseId || typeof courseId !== 'string') {
    console.log('Invalid course ID provided.');
    return null;
  }

  const sanitizedCourseId = courseId.trim();
  const url = `${isProduction ? baseUrl : localhostUrl}/api/course/cartInfo/${sanitizedCourseId}`;

  try {
    const response = await axiosClient.get(url);

    if (response?.data?.data) {
      return response.data.data;
    }

    console.warn('No course data found in the response.');
    return null;
  } catch (error) {
    console.log(`Error fetching course with ID ${sanitizedCourseId}:`, error);
    throw error;
  }
};

export default getCourseCartInfoByCourseId;
