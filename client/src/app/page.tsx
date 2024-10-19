import Image from "next/image";
import wave from "../../public/images/wave.svg";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <>
      <div className="relative h-56">
        <Image
          priority
          src={wave}
          alt="Green Wave"
          className="z-0 pointer-events-none select-none"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-10/12">
          <p className="text-xl md:text-sm">Team Justice Introduces</p>
          <h1 className="font-lalezer text-8xl text-textGreen leading-none p-0 m-0 md:text-4xl">
            SparcHub
          </h1>
          <p className="text-2xl md:text-lg">
            Your go-to destination for UNSW society reviews and insights.
          </p>
          <div className="flex justify-center items-center mt-10 pb-10">
            <SearchBar />
          </div>
          <div className="flex flex-wrap gap-5">
            {/* Placeholder blocks :) */}
            <div className="basis-1/4 grow h-56 bg-[foreground] shadow-md p-4">
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
            </div>
            <div className="basis-1/4 grow h-56 bg-[foreground] shadow-md p-4">
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
            </div>
            <div className="basis-1/4 grow h-56 bg-[foreground] shadow-md p-4">
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
