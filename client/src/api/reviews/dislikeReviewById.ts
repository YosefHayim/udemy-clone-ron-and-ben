import { axiosClient, baseUrl } from "../configuration";

type fn = (idOfReview: string) => Promise<any>;

export const dislikeReviewById: fn = async (idOfReview: string) => {
  if (!idOfReview || typeof idOfReview !== "string") {
    console.error(`Invalid reviewId: ${idOfReview}`);
    return;
  }
  const sanitizedReviewId = idOfReview.trim();
  const url = `${baseUrl}/api/review/dislike/${sanitizedReviewId}`;
  try {
    const res = await axiosClient.post(url);

    if (res) {
      console.log(res.data.data);
      return res;
    }
  } catch (error) {
    console.error(`Error occurred during like a review: `, error);
  }
};
