"use client";
import Review from "@/components/Review";
import Image from "next/image";
// import converter from "number-to-words";
// import Data from "../../../../reviewData.json";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Review as Reviews, User } from "../../../../interface";

interface ProfileClientProps {
  userReviewData: Reviews[];
  userDetailData: User;
}

export default function ProfileClient({
  userReviewData,
  userDetailData,
}: ProfileClientProps) {
  const initialReviews = 3;
  const addedReviewsPerLoad = 3;
  const loadingDebounce = 100;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(initialReviews);

  const debouncedLoadMore = debounce(() => {
    setVisibleReviews((prev) => prev + addedReviewsPerLoad);
  }, loadingDebounce);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (
          entries[0].isIntersecting &&
          userReviewData.length >= visibleReviews
        ) {
          debouncedLoadMore();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    const ref = loadMoreRef.current;
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  });

  return (
    <>
      <div
        className={`flex flex-col ${userReviewData.length === 0 && "h-screen"}`}
      >
        <Image
          priority
          src={"/assets/wave.svg"}
          alt="Green Wave"
          className="pointer-events-none select-none"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="flex flex-col gap-3 px-20">
          <div className="flex items-center gap-4">
            <div>
              <Image
                priority
                src="https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
                alt="Green Wave"
                className="rounded-full"
                width={70}
                height={70}
              />
            </div>
            <h1 className="font-lalezar text-5xl text-textGreen">
              {userDetailData.zid}
            </h1>
            <button className="flex gap-1 bg-lightGreen px-3 py-1 rounded-lg relative overflow-hidden text-2xl font-lalezar cursor-not-allowed">
              Edit Profile
            </button>
          </div>
          <div className="flex flex-col text-2xl font-spartan mb-8 mt-2">
            {/* <p>
              <span className="font-semibold text-textGreen">Name:</span>{" "}
              {userData.name}
            </p>
            <p>
              <span className="font-semibold text-textGreen">
                Degree / Year:
              </span>{" "}
              {userData.degree} {converter.toOrdinal(userData.Year)} Year
            </p>
            <p>
              <span className="font-semibold text-textGreen">Description:</span>{" "}
              Happy to be here!
            </p> */}
          </div>
          <h1 className="font-lalezar text-textGreen text-4xl">Your Reviews</h1>
          {userReviewData.length !== 0 && (
            <div className="grid grid-cols-1 gap-5 my-6">
              {userReviewData.slice(0, visibleReviews).map((review) => (
                <Review
                  key={review.id}
                  variant="profile"
                  anonymous={false}
                  username={review.user_id}
                  title={review.title}
                  starRating={review.rating as 1 | 2 | 3 | 4 | 5}
                  date={review.created_at}
                  // tags={review.tags}
                  reviewContent={review.content}
                />
              ))}
              <div ref={loadMoreRef} className="h-5"></div>
            </div>
          )}
        </div>
        {userReviewData.length === 0 && (
          <div className="text-4xl font-lalezar w-full h-full flex justify-center items-center">
            No reviews yet
          </div>
        )}
      </div>
    </>
  );
}
