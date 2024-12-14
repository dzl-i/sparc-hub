import { Review } from "../../../../interface";
import ProfileClient from "./ProfileClient";

export default async function ReviewPage() {
  const userReviewResp = await fetch(`http://127.0.0.1:8080/users/me/reviews`);
  const userDetailResp = await fetch(`http://127.0.0.1:8080/get_user_detail`, {
    cache: "no-store",
  });

  const userReviewData = await userReviewResp.json();
  const userDetailData = await userDetailResp.json();
  const reviewDated = userDetailData.map((review: Review) => ({
    ...review,
    created_at: new Date(review.created_at),
  }));

  return (
    <ProfileClient
      userReviewData={userReviewData}
      userDetailData={reviewDated}
    />
  );
}
