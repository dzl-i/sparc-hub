import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import Image from "next/image";
import Chip from "@/components/Chip";
import { createRipple } from "@/components/Button";
import { SquarePen } from "lucide-react";

export default function SocietyPage() {
  const Top3tags = ["test", "test", "test"];
  const avgStar = 4.5;
  const percentage = ((avgStar / 5) * 100).toFixed(1) + "%";
  const reviews = 12;

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
      <div className="grid grid-cols-2 w-full px-20 gap-40">
        <div className="flex flex-col sticky top-0 pt-10 rounded-lg max-h-screen overflow-auto">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3">
              <Image
                priority
                src={"https://cdn.linkupevents.com/arc_logo.png"}
                alt="Society Logo"
                className="rounded-full"
                sizes="100vw"
                width={100}
                height={100}
              />
              <div className="flex justify-center items-center gap-2">
                <MdEmail size={"1.5em"} className="cursor-pointer" />
                <FaFacebook size={"1.5em"} className="cursor-pointer" />
                <AiOutlineGlobal size={"1.5em"} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl">Software Development Society</h1>
              <div className="flex flex-row gap-0.5">
                <div className="relative inline-block text-slate-400">
                  <p className="text-2xl">★★★★★</p>
                  <p
                    className="text-2xl bg-[#299800] bg-clip-text absolute inset-0 text-transparent"
                    style={{ width: percentage }}
                  >
                    ★★★★★
                  </p>
                </div>
                <p className="text-sm text-slate-800 px-1 pt-1">
                  {reviews} Reviews
                </p>
              </div>
              <p className="text-lg line-clamp-10">
                We are the Software Development Society, a place for imaginative
                and inventive students dedicated to crafting exceptional
                products for the benefit of the community! Within our society,
                you'll find over five teams of enthusiastic students diligently
                working on a wide array of web apps, ranging from academic
                degree planners to platforms that display available campus
                facilities. Our primary goal is to develop solutions that
                enhance the lives of university students in their daily
                routines.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-lg">Top 3 Tags</h2>
            <div className="flex flex-row gap-8">
              {Top3tags.map((tag, index) => (
                <Chip variant="top3" key={index}>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className="pb-5 pt-10">
          <div className="flex justify-between pb-2">
            <div className="flex items-center">
              <h1 className="text-4xl">Reviews</h1>
            </div>
            <button
              className="flex gap-1 bg-lightGreen px-4 py-2 rounded relative overflow-hidden text-xl"
              onClick={createRipple}
            >
              <SquarePen /> Add Review
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
            <div className="w-full h-60 border-solid border-black border-2 p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
