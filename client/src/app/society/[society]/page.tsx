"use client";

import { MdEmail } from "react-icons/md";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import Image from "next/image";
import Chip from "@/components/Chip";
import { createRipple } from "@/components/Button";
import { SquarePen } from "lucide-react";
import Review from "@/components/Review";
import ReviewSocietyModal from "@/components/ReviewSocietyModal";
import DropdownSelect from "@/components/DropdownSelect";
import Rating from "@/components/Rating";
import { useEffect, useRef, useState } from "react";
import Data from "../../../../reviewData.json";
import { DropdownItem } from "../../../../interface";

export default function SocietyPage() {
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
    setIsOpen(true);
    setIsAnimating(true);
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Wait for animation to complete
  };

  const societyData = {
    avgStar: 4.5,
    topTags: ["Engaging", "Friendly", "Epic"],
    reviews: 12,
    websiteUrl: "https://unswavsoc.com",
    facebookUrl: "https://www.facebook.com/DataSoc",
    discordUrl: "https://discord.gg/CWnTGNZzKU",
    emailUrl: "unsw@180dc.org",
    instagramUrl: "https://instagram.com/aiesecinunsw",
  };

  const data = Data.map((review) => ({
    ...review,
    date: new Date(review.date),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && Data.length >= visibleReviews) {
          setTimeout(() => {
            setVisibleReviews((prev) => prev + addedReviewsPerLoad);
          }, loadingDebounce);
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

  const sortedReviews = [...data].sort((a, b) => {
    if (sortOption === "Recent") {
      return b.date.getTime() - a.date.getTime();
    } else if (sortOption === "Rating(H-L)") {
      if (b.starRating === a.starRating) {
        // If rating the same, sort by most recent
        return b.date.getTime() - a.date.getTime();
      }
      return b.starRating - a.starRating;
    } else if (sortOption === "Rating(L-H)") {
      if (a.starRating === b.starRating) {
        // If rating the same, sort by most recent
        return b.date.getTime() - a.date.getTime();
      }
      return a.starRating - b.starRating;
    }

    return 0;
  });

  const percentage = ((societyData.avgStar / 5) * 100).toFixed(1) + "%";

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
                src={"https://cdn.linkupevents.com/arc_logo.png"}
                alt="Society Logo"
                className="rounded-full"
                width={140}
                height={120}
              />
              <div className="flex justify-center items-center gap-2 flex-wrap w-24">
                {societyData.discordUrl && (
                  <a
                    href={societyData.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {societyData.instagramUrl && (
                  <a
                    href={societyData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {societyData.emailUrl && (
                  <a
                    href={`mailto:${societyData.emailUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdEmail size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {societyData.facebookUrl && (
                  <a
                    href={societyData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={"1.5em"} className="cursor-pointer" />
                  </a>
                )}
                {societyData.websiteUrl && (
                  <a
                    href={societyData.websiteUrl}
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
              <h1 className="text-4xl font-lalezar">
                Software Development Society
              </h1>
              <div className="flex flex-row gap-0.5">
                <Rating percentage={percentage} />
                <p className="text-sm text-slate-800 px-1 pt-1">
                  {societyData.reviews} Reviews
                </p>
              </div>
              <p className="text-lg line-clamp-10">
                We are the Software Development Society, a place for imaginative
                and inventive students dedicated to crafting exceptional
                products for the benefit of the community! Within our society,
                you&apos;ll find over five teams of enthusiastic students
                diligently working on a wide array of web apps, ranging from
                academic degree planners to platforms that display available
                campus facilities. Our primary goal is to develop solutions that
                enhance the lives of university students in their daily
                routines.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-lalezar">Top 3 Tags</h2>
            <div className="flex flex-row gap-8 mt-2">
              {societyData.topTags.map((tag, index) => (
                <Chip variant="top3" key={index}>
                  {tag}
                </Chip>
              ))}
            </div>
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
            {sortedReviews.slice(0, visibleReviews).map((review, index) => (
              <Review
                key={index}
                anonymous={review.anonymous}
                username={review.username}
                title={review.title}
                starRating={review.starRating as 1 | 2 | 3 | 4 | 5}
                date={review.date}
                tags={review.tags}
                reviewContent={review.reviewContent}
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
                name="Software Development Society"
                logo="https://cdn.linkupevents.com/society/Software+Development+Society.png"
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
