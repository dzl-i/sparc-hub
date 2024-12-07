import { createRipple } from "@/components/Button";
import Review from "@/components/Review";
import Image from "next/image";

export default function Profile() {
  const reviews = true;
  return (
    <div className={`flex flex-col ${!reviews && 'h-screen'}`}>
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
      <div className="px-10">
        <div className="flex items-center gap-4 pb-5">
          <div>
            <Image
              priority
              src="https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
              alt="Green Wave"
              className="rounded-full"
              width={70}
              height={0}
            />
          </div>
          <h1 className="font-lalezar text-4xl text-textGreen">z5583784</h1>
          <button
            className="flex gap-1 bg-lightGreen px-3 py-1 rounded-xl relative overflow-hidden text-xl font-lalezar"
            onClick={createRipple}
          >
            Edit Profile
          </button>
        </div>
        {reviews && (
          <div className="grid grid-cols-3 gap-7 1xl:grid-cols-2 landmd:grid-cols-1 mb-6">
            <Review
              anonymous={false}
              username="z5583784"
              title="Best society ever"
              starRating={4}
              date={new Date()}
              tags={["Engaging", "Friendly", "Epic"]}
              reviewContent=" We are the Software Development Society, a place for imaginative
                and inventive students dedicated to crafting exceptional
                products for the benefit of the community! Within our society,
                you'll find over five teams of enthusiastic students diligently
                working on a wide array of web apps, ranging from academic
                degree planners to platforms that display available campus
                facilities. 
                


                Our primary goal is to develop solutions that
                enhance the lives of university students in their daily
                routines.
                
                
                "
            />
            <Review
              anonymous={false}
              username="z5583784"
              title="Best society ever"
              starRating={4}
              date={new Date()}
              tags={["Engaging", "Friendly", "Epic"]}
              reviewContent=" We are the Software Development Society, a place for imaginative
                and inventive students dedicated to crafting exceptional
                products for the benefit of the community! Within our society,
                you'll find over five teams of enthusiastic students diligently
                working on a wide array of web apps, ranging from academic
                degree planners to platforms that display available campus
                facilities. 
                


                Our primary goal is to develop solutions that
                enhance the lives of university students in their daily
                routines.
                
                
                "
            />
            <Review
              anonymous={false}
              username="z5583784"
              title="Best society ever"
              starRating={4}
              date={new Date()}
              tags={["Engaging", "Friendly", "Epic"]}
              reviewContent=" We are the Software Development Society, a place for imaginative
                and inventive students dedicated to crafting exceptional
                products for the benefit of the community! Within our society,
                you'll find over five teams of enthusiastic students diligently
                working on a wide array of web apps, ranging from academic
                degree planners to platforms that display available campus
                facilities. 
                


                Our primary goal is to develop solutions that
                enhance the lives of university students in their daily
                routines.
                
                
                "
            />
          </div>
        )}
      </div>
      {!reviews && (
        <div className="text-4xl font-lalezar w-full h-full flex justify-center items-center">
          No reviews yet
        </div>
      )}
    </div>
  );
}
