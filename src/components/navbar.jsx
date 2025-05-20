import FavoriteIcon from "../icons/favorite-icon";
import HomeIcon from "../icons/home-icon";
import LibraryIcon from "../icons/library-icon";
import { useContext } from "react";
import { queueContext } from "../App";
import { useNavigate } from "react-router-dom";
export default function Navbar({ isPlaying, setPrevUrl, prevUrl }) {
  const { showPhoneTrackSection } = useContext(queueContext);
  const nav = useNavigate();
  return (
    <>
      {!showPhoneTrackSection && (
        <nav className=" w-[100vw] sm:w-[90px] bg-black bg-opacity-95 sm:bg-[#000000] sm:grid sm:grid-rows-8 items-center justify-items-center fixed flex justify-around h-[10vh] bottom-[-1px] sm:h-screen z-10">
          <HomeIcon
            styles={
              "text-gray-100 row-start-3 hover:text-slate-300 duration-300 xl:w-[60px] w-[50px] cursor-pointer"
            }
            isPlaying={isPlaying}
            setPrevUrl={setPrevUrl}
            prevUrl={prevUrl}
          />
          <FavoriteIcon
            styles={
              "text-gray-100 row-start-5 hover:text-slate-300 duration-300 xl:w-[60px] w-[50px] cursor-pointer"
            }
            nav={nav}
            setPrevUrl={setPrevUrl}
          />

          <LibraryIcon
            styles={
              "text-gray-100 row-start-4 flex justify-center items-center hover:text-slate-300 duration-300 xl:w-[60px] w-[50px]"
            }
          />
        </nav>
      )}
    </>
  );
}
