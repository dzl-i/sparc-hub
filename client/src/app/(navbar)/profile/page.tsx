import { Review } from "../../../../interface";
import ProfileClient from "./ProfileClient";

export default async function ReviewPage() {
  const userReviewResp = await fetch(`http://127.0.0.1:8080/users/me/reviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ6aWQiOiJuZXd1c2VyIiwiYWRtaW4iOmZhbHNlLCJleHAiOjE3MzQyODA4NzR9.JwKXb7vSUFLVSbvEn3pYBKzJyFfZVwn9FMWag5ngYXA`,
    },
    cache: "no-store",
  });
  const userDetailResp = await fetch(`http://127.0.0.1:8080/user/user_detail`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ6aWQiOiJuZXd1c2VyIiwiYWRtaW4iOmZhbHNlLCJleHAiOjE3MzQyODA4NzR9.JwKXb7vSUFLVSbvEn3pYBKzJyFfZVwn9FMWag5ngYXA`,
    },
  });

  const userReviewData = await userReviewResp.json();
  const userDetailData = await userDetailResp.json();
  const reviewDated = userReviewData.map((review: Review) => ({
    ...review,
    created_at: new Date(review.created_at),
  }));

  return (
    <ProfileClient
      userReviewData={reviewDated}
      userDetailData={userDetailData}
    />
  );
}
