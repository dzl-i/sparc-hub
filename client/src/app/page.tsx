"use client";

import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { ReviewCard } from "@/components/ReviewCard";
import data from "../../societyData.json";
import { useState, useRef, useEffect } from "react";
import DropdownSelect from "@/components/DropdownSelect";
import debounce from "lodash/debounce";
import { DropdownItem } from "../../interface";

export default function Home() {
  const initialSocieties = 12;
  const addedSocietiesPerLoad = 12;
  const loadingDebounce = 300;
  const filterDebounce = 300;

  const [inputText, setInputText] = useState("");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [visibleSocieties, setVisibleSocieties] = useState(initialSocieties);
  const [sortOption, setSortOption] = useState("");

  const sortSocietiesData: DropdownItem[] = [
    {
      id: "A-Z",
      name: "Alphabetical (A-Z)",
    },
    {
      id: "Z-A",
      name: "Alphabetical (Z-A)",
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

  const debouncedSetInputText = debounce(
    (text: string) => setInputText(text),
    filterDebounce
  );

  const filteredData = data.filter(
    (society) =>
      society.fullTitle.toLowerCase().includes(inputText.toLowerCase()) ||
      society.abbreviatedTitle.toLowerCase().includes(inputText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "A-Z") return a.fullTitle.localeCompare(b.fullTitle);
    if (sortOption === "Z-A") return b.fullTitle.localeCompare(a.fullTitle);

    if (sortOption === "Rating(H-L)") {
      // Ensure societies with no reviews are placed last
      if (b.numReviews === 0) return -1;
      if (a.numReviews === 0) return 1;

      // If ratings are equal, then sort by number of reviews
      if (b.ratingAvg !== a.ratingAvg) {
        return b.ratingAvg - a.ratingAvg;
      }

      return b.numReviews - a.numReviews;
    }

    if (sortOption === "Rating(L-H)") {
      // Ensure societies with no reviews are placed last
      if (a.numReviews === 0) return 1;
      if (b.numReviews === 0) return -1;

      // If ratings are equal, then sort by number of reviews
      if (a.ratingAvg !== b.ratingAvg) {
        return a.ratingAvg - b.ratingAvg;
      }

      return b.numReviews - a.numReviews;
    }

    return 0;
  });

  useEffect(() => {
    setVisibleSocieties(initialSocieties);
  }, [inputText, sortOption]);

  const debouncedLoadMore = debounce(() => {
    setVisibleSocieties((prev) => prev + addedSocietiesPerLoad);
  }, loadingDebounce);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (
          entries[0].isIntersecting &&
          filteredData.length >= visibleSocieties
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
      <div className="flex flex-col items-center">
        <div className="w-5/6">
          <p className="font-lalezar text-xl md:text-sm">
            Team Justice Introduces
          </p>
          <h1 className="font-lalezar text-8xl text-textGreen leading-none md:text-5xl">
            SparcHub
          </h1>
          <p className="font-lalezar text-2xl md:text-lg">
            Your go-to destination for UNSW society reviews and insights.
          </p>
          <div className="flex justify-center items-center mt-10 mb-10 gap-4">
            <SearchBar
              inputText={inputText}
              setInputText={debouncedSetInputText}
            />
            <DropdownSelect
              id="sort-societies"
              data={sortSocietiesData}
              width="260px"
              title="Sort by"
              selectedId={sortOption}
              onSelect={(id) => setSortOption(id)}
            />
          </div>
          <div className="grid grid-cols-3 gap-7 1xl:grid-cols-2 landmd:grid-cols-1 mb-6">
            {sortedData.slice(0, visibleSocieties).map((society, index) => (
              <ReviewCard
                key={index}
                avgStar={society.ratingAvg}
                reviews={society.numReviews}
                title={society.fullTitle}
                logo={society.logo}
                tags={[]}
                description={society.description}
              />
            ))}
          </div>
        </div>
        <div ref={loadMoreRef} className="h-10" />
      </div>
    </>
  );
}
