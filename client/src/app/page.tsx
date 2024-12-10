import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { ReviewCard } from "@/components/ReviewCard";
import data from "../../societyData.json";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

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
          <div className="flex justify-center items-center mt-10 mb-10">
            <SearchBar />
          </div>
          <div className="grid grid-cols-3 gap-7 1xl:grid-cols-2 landmd:grid-cols-1 mb-6">
            {data.map((society) => (
              <ReviewCard
                key={1}
                avgStar={Math.random() * 5}
                reviews={12}
                title={society.fullTitle}
                logo={society.logo}
                tags={[]}
                description={society.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
