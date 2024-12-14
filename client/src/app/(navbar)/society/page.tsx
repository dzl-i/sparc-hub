import { Review } from "../../../../interface";
import SingleSocietyClient from "./SingleSocietyClient";

interface ReviewPageProps {
  searchParams: {
    id: string;
  };
}

export default async function ReviewPage({
  searchParams: { id },
}: ReviewPageProps) {
  const societyResp = await fetch(`http://127.0.0.1:8080/societies/${id}`);
  const reviewResp = await fetch(
    `http://127.0.0.1:8080/societies/${id}/reviews`,
    {
      cache: "no-store",
    }
  );
  const society = await societyResp.json();
  const reviewData = await reviewResp.json();
  const reviewDated = reviewData.map((review: Review) => ({
    ...review,
    created_at: new Date(review.created_at),
  }));

  return <SingleSocietyClient society={society} reviewData={reviewDated} />;
}
