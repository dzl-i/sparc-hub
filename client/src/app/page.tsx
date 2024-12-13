"use client";

import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { ReviewCard } from "@/components/ReviewCard";
import data from "../../societyData.json";
import { useState, useRef, useEffect } from "react";
import DropdownSelect, { DropdownItem } from "@/components/DropdownSelect";

export default function Home() {
  const initialSocieties = 12;
  const addedSocietiesPerLoad = 6;
  const loadingDebounce = 200;

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

  // Filter societies based on search input
  const searchedData = data.filter(
    (society) =>
      society.fullTitle.toLowerCase().includes(inputText.toLowerCase()) ||
      society.abbreviatedTitle.toLowerCase().includes(inputText.toLowerCase())
  );

  const sortedData = [...searchedData].sort((a, b) => {
    if (sortOption === "A-Z") return a.fullTitle.localeCompare(b.fullTitle);
    if (sortOption === "Z-A") return b.fullTitle.localeCompare(a.fullTitle);
    
    if (sortOption === "Rating(H-L)") {
      // Ensure societies with no reviews are placed last
      if (b.numReviews === 0) return -1;
      if (a.numReviews === 0) return 1;
      return b.ratingAvg - a.ratingAvg;
    } 


    if (sortOption === "Rating(L-H)") {
      // Ensure societies with no reviews are placed last
      if (a.numReviews === 0) return 1;
      if (b.numReviews === 0) return -1;
      return a.ratingAvg - b.ratingAvg;
    }

    return 0;
  });

  useEffect(() => {
    setVisibleSocieties(initialSocieties);
  }, [inputText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleSocieties((prev) => prev + addedSocietiesPerLoad);
          }, loadingDebounce);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, []);

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
            <SearchBar inputText={inputText} setInputText={setInputText} />
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
            {sortedData.slice(0, visibleSocieties).map((society) => (
              <ReviewCard
                key={1}
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
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </>
  );
}
