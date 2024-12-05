import { X } from "lucide-react";
import StarRating from "./StarRating";
import InputField from "./InputField";
import Textbox from "./Textbox";
import TagGroup from "./TagGroup";
import Button from "./Button";
import Image from "next/image";

interface ReviewSocietyModalProps {
  name: string;
  logo?: string;
  avgRating?: 'Overwhelmingly Positive' | 'Very Positive' | 'Positive' | 'Mixed' | 'Mostly Negative' | 'Negative';
  numReviews: number;
  onClose: () => void;
}

function ReviewSocietyModal({
  name,
  logo = "https://cdn.linkupevents.com/arc_logo.png",
  avgRating,
  numReviews,
  onClose
}: ReviewSocietyModalProps) {
  return (
    <>
      {/* container */}
      <div className="bg-[hsl(50,21%,95%)] h-[1000px] w-[850px] rounded-lg overflow-hidden">
        {/* outer flex */}
        <div className="flex flex-col">
          {/* header */}
          <div className="flex flex-col bg-[hsl(30,9%,17%)] p-4">
            <div className="flex justify-between items-start">
              <div className="text-[hsl(50,21%,95%)] text-[50px] pl-4">Submit Review</div>
              <button onClick={onClose}>
                <X size="40" strokeWidth="0.5" color="hsl(50,21%,95%)"/>
              </button>
            </div>
            <hr></hr>
            {/* profile div */}
            <div className="flex pl-5 pt-3 gap-4 pb-2">
              <Image
                width={70}
                height={70}
                alt="society logo"
                src={logo}
                className="rounded-full"
              />
              <div className="flex flex-col leading-none pt-2">
                <div className="text-[hsl(50,21%,95%)] text-[30px]">{name}</div>
                {numReviews > 0 ? (
                  <div className="self-start p-1 text-[hsl(50,21%,95%)] text-[12px] font-spartan bg-[hsl(85,49%,40%)] rounded-md">
                    {avgRating} &#40;{numReviews}&#41;
                  </div>
                ) : (
                  <div className="self-start p-1 text-[hsl(50,21%,95%)] text-[12px] font-spartan bg-[hsl(85,49%,40%)] rounded-md">
                    No reviews yet
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* content */}
          <div className="flex flex-col items-center justify-center px-16 gap-4 bg-[hsl(50,21%,95%)]">
            <div className="pt-20 pb-10"><StarRating/></div>
            <InputField>Title</InputField>
            <Textbox>Review</Textbox>
            <TagGroup/>
            <div className="flex gap-1 self-start pl-1 pt-1">
              <input type="checkbox" id="anonymous"/>
              <label className="font-spartan text-sm font-bold">Display anonymously</label>
            </div>
            <div className="self-end">
              <Button onClick={onClose}>
                Submit
              </Button></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewSocietyModal;
