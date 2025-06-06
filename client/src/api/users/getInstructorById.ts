import { axiosClient, baseUrl, isProduction, localhostUrl } from "../configuration";

const getInstructorById = async (instructorId: string) => {
  if (!instructorId) throw new Error("Please provide instructorId in url.");

  try {
    const url = `${isProduction ? baseUrl : localhostUrl}/api/instructor/${instructorId}`;

    const r = await axiosClient.get(url);

    if (r) {
      console.log(r.data.data);
      return r?.data?.data;
    }
  } catch (error) {
    console.log(
      `Error has been occurred durning getting instructor information: `,
      error.response.data.message
    );
    throw error;
  }
};

export default getInstructorById;
