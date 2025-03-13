import FavoriteIcon from "../icons/favorite-icon";
import HomeIcon from "../icons/home-icon";
import LibraryIcon from "../icons/library-icon";
export default function Navbar({ isPlaying, setPrevUrl, prevUrl }) {
  return (
    <nav className="w-[90px] bg-[#000000] grid grid-rows-8 items-center justify-items-center fixed h-screen z-10">
      <FavoriteIcon
        styles={
          "text-gray-100 row-start-5 hover:text-slate-300 duration-300 xl:w-[60px] w-[50px]"
        }
      />
      <HomeIcon
        styles={
          "text-gray-100 row-start-3 hover:text-slate-300 duration-300 xl:w-[60px] w-[50px]"
        }
        isPlaying={isPlaying}
        setPrevUrl={setPrevUrl}
        prevUrl={prevUrl}
      />
      <LibraryIcon
        styles={
          "text-gray-100 row-start-4 flex justify-center items-center hover:text-slate-300 duration-300 xl:w-[60px] w-[50px]"
        }
      />
    </nav>
  );
}
