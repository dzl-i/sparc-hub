import { Review } from "../../../../interface";
import ProfileClient from "./ProfileClient";

interface ProfilePageProps {
  searchParams: {
    token: string;
  };
}

export default async function ProfilePage({
  searchParams: { token },
}: ProfilePageProps) {
  const userReviewResp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/reviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const userDetailResp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user_detail`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
