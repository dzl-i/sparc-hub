"use client";
import { MdEmail } from "react-icons/md";
import { FaDiscord, FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import Image from "next/image";
import { createRipple } from "@/components/Button";
import { SquarePen } from "lucide-react";
import ReviewSocietyModal from "@/components/ReviewSocietyModal";
import DropdownSelect from "@/components/DropdownSelect";
import Rating from "@/components/Rating";
import { useEffect, useRef, useState } from "react";
import Data from "../../../../reviewData.json";
import {
  DropdownItem,
  Review as Reviews,
  Society,
} from "../../../../interface";
import { debounce } from "lodash";
import Review from "@/components/Review";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface SocietyPageProps {
  society: Society;
  reviewData: Reviews[];
}

export default function SingleSocietyClient({
  society,
  reviewData,
}: SocietyPageProps) {
  const { user } = useAuth();
  const router = useRouter();

  const initialReviews = 3;
  const addedReviewsPerLoad = 3;
  const loadingDebounce = 100;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(initialReviews);
  const [sortOption, setSortOption] = useState("Recent");
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [isAnimating, setIsAnimating] = useState(false); // Controls animation state

  const sortReviewsData: DropdownItem[] = [
    {
      id: "Recent",
      name: "Most Recent",
    },
    {
      id: "Rating(H-L)",
      name: "Rating (High to Low)",
    },
    {
      id: "Rating(L-H)",
      name: "Rating (Low to High)",
    },
  ];

  const handleOpenModal = () => {
    if (!user) {
      router.push("/login");
    }
    setIsOpen(true);
    setIsAnimating(true);
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Wait for animation to complete
  };

  const debouncedLoadMore = debounce(() => {
    setVisibleReviews((prev) => prev + addedReviewsPerLoad);
  }, loadingDebounce);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && Data.length >= visibleReviews) {
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

  const sortedReviews = [...reviewData].sort((a, b) => {
    if (sortOption === "Recent") {
      return b.created_at.getTime() - a.created_at.getTime();
    } else if (sortOption === "Rating(H-L)") {
      if (b.rating === a.rating) {
        // If rating the same, sort by most recent
        return b.created_at.getTime() - a.created_at.getTime();
      }
      return b.rating - a.rating;
    } else if (sortOption === "Rating(L-H)") {
      if (a.rating === b.rating) {
        // If rating the same, sort by most recent
        return b.created_at.getTime() - a.created_at.getTime();
      }
      return a.rating - b.rating;
    }

    return 0;
  });

  const percentage = ((society.average_rating / 5) * 100).toFixed(1) + "%";

  return (
    <>
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

      <div className="grid grid-cols-2 w-full px-20 gap-20 font-spartan">
        <div className="flex flex-col sticky top-0 pt-10 rounded-lg max-h-screen">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 basis-2/12 items-center">
              <Image
                priority
                src={society.icon}
                alt="Society Logo"
                className="rounded-full"
                width={140}
                height={120}
              />
              <div className="flex justify-center items-center gap-2 flex-wrap w-24">
                {society.discord && (
                  <a
                    href={society.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {/* {society.instagram && (
                    <a
                      href={society.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={"1.5em"} className="cursor-pointer" />
                    </a>
                  )} */}
                {society.email && (
                  <a
                    href={`mailto:${society.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdEmail size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {society.facebook && (
                  <a
                    href={society.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {society.website && (
                  <a
                    href={society.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineGlobal
                      size={"1.5em"}
                      className="cursor-pointer"
                    />
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col basis-9/12">
              <h1 className="text-4xl font-lalezar">{society.name}</h1>
              <div className="flex flex-row gap-0.5">
                <Rating percentage={percentage} />
                <p className="text-sm text-slate-800 px-1 pt-1">
                  {society.total_reviews} Reviews
                </p>
              </div>
              <p className="text-lg line-clamp-10">{society.description}</p>
            </div>
          </div>
          <div className="mt-4">
            {/* <h2 className="text-lg font-lalezar">Top 3 Tags</h2>
            <div className="flex flex-row gap-8 mt-2">
              {societyData.topTags.map((tag, index) => (
                <Chip variant="top3" key={index}>
                  {tag}
                </Chip>
              ))}
            </div> */}
          </div>
        </div>
        <div className="pb-5 pt-10">
          <div className="flex justify-between pb-4">
            <div className="flex items-center">
              <h1 className="text-4xl font-lalezar">Reviews</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <DropdownSelect
                id="sort-reviews"
                selectedId={sortOption}
                data={sortReviewsData}
                width="260px"
                variant="societyPage"
                onSelect={(id) => setSortOption(id)}
              />
              <button
                className="flex gap-1 bg-lightGreen px-4 py-2 rounded-lg relative overflow-hidden text-xl font-spartan"
                onClick={(e) => {
                  createRipple(e);
                  handleOpenModal();
                }}
              >
                <SquarePen /> Add Review
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {sortedReviews.slice(0, visibleReviews).map((review) => (
              <Review
                key={review.id}
                anonymous={review.anonymous}
                username={review.user_id}
                title={review.title}
                starRating={review.rating as 1 | 2 | 3 | 4 | 5}
                date={review.created_at}
                tags={review.tags}
                reviewContent={review.content}
              />
            ))}
          </div>
          <div ref={loadMoreRef} className="h-5"></div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className={`overflow-auto fixed inset-0 z-50 transition-opacity duration-300 ${
            isAnimating ? "bg-opacity-50 bg-black" : "bg-opacity-0"
          }`}
          onClick={handleCloseModal}
        >
          <div
            className="flex items-center justify-center min-h-full py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`rounded-lg shadow-md ${
                isAnimating ? "animate-fade-in" : "animate-fade-out"
              }`}
            >
              <ReviewSocietyModal
                society={society}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
