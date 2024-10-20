import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SparcHub",
  description: "The offical UNSW home for societies reviews and insights.",
  icons: {
    icon: "/images/tempIcon.svg",
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
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="w-5/6">
          <p className="text-xl md:text-sm">Team Justice Introduces</p>
          <h1 className="font-lalezer text-8xl text-textGreen leading-none md:text-5xl">
            SparcHub
          </h1>
          <p className="text-2xl md:text-lg">
            Your go-to destination for UNSW society reviews and insights.
          </p>
          <div className="flex justify-center items-center mt-10 mb-10">
            <SearchBar />
          </div>
          <div className="flex flex-wrap gap-5 mb-5">
            {/* Placeholder blocks :) */}
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
            <div className="basis-1/4 md:basis-full grow h-56 bg-white shadow-md p-4 rounded">
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gray-300 mb-2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
