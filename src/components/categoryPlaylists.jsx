import { useRef } from "react";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";

export default function CategoryPlaylists({ arr, index }) {
  const h = arr[0];
  const x = arr.slice(1);

  const scrollRef = useRef();
  let style = {};
  if (index == 0) {
    style = { marginTop: "50px" };
  }

  return (
    <div style={style} className=" mt-4 sm:mt-16 lg-min-h-[33vh]">
      <div className="flex justify-between">
        {h}

        <div className="sm:flex  hidden">
          <LeftArrow scrollRef={scrollRef} />
          <RightArrow scrollRef={scrollRef} />
        </div>
      </div>

      <div
        className="overflow-y-hidden sm:overflow-x-hidden sm:mt-8  pb-5 min-h-[20vh] sm:min-h-[25vh] overflow-x-scroll scrollbar-none"
        ref={scrollRef}
      >
        <div className="h-1/2 sm:h-1/3 grid grid-cols-6 gap-x-10 w-[350%] lg-min-h-[20vh] sm:w-[250%] md:w-[200%] lg:w-[175%] xl:w-[150%]  2xl:w-[125%]">
          {x}
        </div>
      </div>
    </div>
  );
}
