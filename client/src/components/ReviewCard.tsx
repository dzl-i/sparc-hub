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
  const stars = Array.from({ length: 5 }, (_, index) =>
    index <= avgStar - 0.5 ? 1 : 0
  );

  return (
    <div className="bg-white shadow-md p-5 rounded-xl md:basis-full basis-cardWidth flex flex-col justify-between cursor-pointer h-64 border-solid border	border-slate-600">
      <div className="flex gap-4">
        <div className="basis-3/12">
          <Image
            width={300}
            height={300}
            alt="society logo"
            src={logo}
            className="rounded-full shadow-lg"
          />
        </div>
        <div className="flex flex-col basis-9/12">
          <div className="font-lalezar flex flex-col justify-between">
            <h1 className="text-xl line-clamp-2">{title}</h1>
            <div className="flex">
              <div className="flex gap-0.5">
                {stars.map((val, index) => {
                  if (val === 1) {
                    return (
                      <Image
                        key={index}
                        alt="green star"
                        width={20}
                        height={20}
                        src={"/assets/star.svg"}
                      />
                    );
                  } else if (val === 0) {
                    return (
                      <Image
                        key={index}
                        alt="empty star"
                        width={20}
                        height={20}
                        src={"/assets/emptyStar.svg"}
                      />
                    );
                  }
                })}
              </div>
              <p className="text-sm text-slate-800 px-1 pt-1">({reviews})</p>
            </div>
          </div>
          <hr className="bg-black h-0.5 my-2" />
          <p className="font-spartan text-md line-clamp-3">{description}</p>
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
