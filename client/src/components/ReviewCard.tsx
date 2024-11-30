import Image from "next/image";
import Chip from "./Chip";

interface ReviewCardProps {
  title: string;
  description: string;
  logo: string;
  tags: string[];
  avgStar: number;
  reviews: number;
}

export function ReviewCard({
  title = "placeholder",
  description = "placeholder",
  logo = "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg",
  tags = [],
  avgStar = 0,
  reviews = 0,
}: ReviewCardProps) {
  // Truncate the description if it exceeds 145 characters
  if (description.length > 130) {
    description = description.slice(0, 130) + "...";
  }

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < avgStar ? 1 : 0
  );

  return (
    <div className="bg-white shadow-md p-4 rounded-lg md:basis-full basis-cardWidth flex flex-col justify-between cursor-pointer h-56">
      <div className="flex gap-4">
        <div className="">
          <Image
            width={100}
            height={100}
            alt="society logo"
            src={logo}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow basis-20">
          <div className="font-lalezar flex justify-between">
            <h1 className="text-4xl">{title}</h1>
            <div className="flex ">
              {stars.map((val, index) => {
                if (val === 1) {
                  return (
                    <Image
                      key={index}
                      alt="green star"
                      width={27}
                      height={27}
                      src={"/assets/star.svg"}
                    />
                  );
                } else if (val === 0) {
                  return (
                    <Image
                      key={index}
                      alt="green star"
                      width={27}
                      height={27}
                      src={"/assets/emptyStar.svg"}
                    />
                  );
                }
              })}
              <p className="text-sm text-slate-800">({reviews})</p>
            </div>
          </div>
          <hr className="bg-black h-0.5 mb-2" />
          <p className="font-spartan text-md break-words">{description}</p>
        </div>
      </div>
      <div className="flex gap-4">
        {tags.map((tag, index) => (
          <div key={index} className="flex basis-chipWidth">
            <Chip variant="landingPage">{tag}</Chip>
          </div>
        ))}
      </div>
    </div>
  );
}
