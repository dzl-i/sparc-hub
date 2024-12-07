import Image from "next/image";
import Tag from "./Tag";
import Chip from "./Chip"
import { format } from 'date-fns';

interface ReviewProps {
  username: string,
  profilePic?: string,
  title: string,
  starRating: 1 | 2 | 3 | 4 | 5,
  reviewContent: string,
  date: Date,
  anonymous: boolean,
  tags?: string[]
}

function Review({
  username,
  profilePic = "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg",
  title,
  starRating,
  reviewContent,
  date,
  anonymous,
  tags
}: ReviewProps) {
  const percentage = ((starRating / 5) * 100) + "%";

  return (
    <>
      {/* Container */}
      <div className="bg-white rounded-lg border-2 p-4 shadow-xl min-w-[320px]">
        {/* Outer Flex */}
        <div className="flex flex-col gap-2">
          {/* Profile and Stars*/}
          <div className="flex justify-between">
            {/* Profile */}
            <div className="flex flex-row gap-2">
              <Image
                width={50}
                height={50}
                alt="User profile picture"
                src={profilePic}
                className="rounded-full"
              />
              <div className="flex flex-col leading-none pt-2 gap-[1px]">
                <div className="font-lalezar text-[20px]">{anonymous ? "Anonymous" : username}</div>
                <div className="font-lalezar text-[12px]">Posted on {format(date, 'dd MMMM yyyy')}</div>
              </div>
            </div>
            {/* Stars */}
            <div className="relative inline-block text-slate-400">
              <p className="text-[30px]">★★★★★</p>
              <p
                className="text-[30px] bg-[#299800] bg-clip-text absolute inset-0 text-transparent"
                style={{ width: percentage }}
              >
                ★★★★★
              </p>
            </div>
          </div>
          {/* Title */}
          <div className="font-lalezar">{title}</div>
          {/* Review Content*/}
          <div className="font-spartan leading-tight text-[16px] pb-2">{reviewContent}</div>
          {/* Tags */}
          <div className="flex gap-2">
            {tags?.slice(0, 3).map((tag, index) => (
              <Chip variant="default" key={index}>{tag}</Chip>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
