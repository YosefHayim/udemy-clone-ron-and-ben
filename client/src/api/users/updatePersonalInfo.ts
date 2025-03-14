import { DataOfUser } from "@/types/types";
import { axiosClient, localhostUrl } from "../configuration";

const updatePersonalInfo = async (dataOfUser: DataOfUser) => {
  if (!dataOfUser) {
    console.log("No data of user to update provided: ", dataOfUser);
  }
  const url = `${localhostUrl}/api/user/`;
  try {
    const r = axiosClient.post(url, dataOfUser);

    if (r) {
      console.log(r);
    }
  } catch (error) {
    console.log(error);
  }
};

export default updatePersonalInfo;
