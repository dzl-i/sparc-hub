import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { Metadata } from "next";
import { ReviewCard } from "@/components/ReviewCard";

export const metadata: Metadata = {
  title: "SparcHub",
  description: "The offical UNSW home for societies reviews and insights.",
  icons: {
    icon: "/assets/tempIcon.svg",
  },
};

export default function Home() {
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
          <div className="flex flex-wrap gap-7">
            <ReviewCard
              avgStar={2}
              reviews={12}
              title="DevSoc"
              logo="https://cdn.linkupevents.com/society/Software+Development+Society.png"
              tags={["Development", "Based", "Cool"]}
              description="Epic society about developing your favorite websites!"
            />
          </div>
        </div>
      </div>
    </>
  );
}
