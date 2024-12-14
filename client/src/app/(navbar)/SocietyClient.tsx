"use client";

import Image from "next/image";
import SearchBar from "../../components/SearchBar";
import { ReviewCard } from "@/components/ReviewCard";
import { useState, useRef, useEffect } from "react";
import DropdownSelect from "@/components/DropdownSelect";
import debounce from "lodash/debounce";
import { DropdownItem, Society } from "../../../interface";

interface HomeProps {
  societies: Society[];
}

export default function Home({ societies }: HomeProps) {
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

  const filteredData = societies.filter(
    (society) =>
      society.name.toLowerCase().includes(inputText.toLowerCase()) ||
      society.abbreviated_name.toLowerCase().includes(inputText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "A-Z") return a.name.localeCompare(b.name);
    if (sortOption === "Z-A") return b.name.localeCompare(a.name);

    if (sortOption === "Rating(H-L)") {
      // Ensure societies with no reviews are placed last
      if (b.total_reviews === 0) return -1;
      if (a.total_reviews === 0) return 1;

      // If ratings are equal, then sort by number of reviews
      if (b.average_rating !== a.average_rating) {
        return b.average_rating - a.average_rating;
      }

      return b.total_reviews - a.total_reviews;
    }

    if (sortOption === "Rating(L-H)") {
      // Ensure societies with no reviews are placed last
      if (a.total_reviews === 0) return 1;
      if (b.total_reviews === 0) return -1;

      // If ratings are equal, then sort by number of reviews
      if (a.average_rating !== b.average_rating) {
        return a.average_rating - b.average_rating;
      }

      return b.total_reviews - a.total_reviews;
    }

    return 0;
  });

  useEffect(() => {
    setVisibleSocieties(initialSocieties);
  }, [inputText, sortOption]);

  const debouncedLoadMore = debounce(() => {
    setVisibleSocieties((prev) => prev + addedSocietiesPerLoad);
  }, loadingDebounce);

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
            {sortedData.slice(0, visibleSocieties).map((society) => (
              <ReviewCard
                key={society.id}
                id={society.id}
                avgStar={society.average_rating}
                reviews={society.total_reviews}
                title={society.name}
                logo={society.icon}
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
