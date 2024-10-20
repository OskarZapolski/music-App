import { useEffect } from "react";
import FavoriteIcon from "../icons/favorite-icon";
import HomeIcon from "../icons/home-icon";
import LibraryIcon from "../icons/library-icon";
export default function Home({ token }) {
  useEffect(() => {
    console.log(token);
    const authOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="bg-neutral-800 h-screen w-screen flex">
      <nav className="w-1/12 bg-black grid grid-rows-8 items-center justify-items-center ">
        <FavoriteIcon
          styles={"text-gray-100 row-start-5 hover:text-slate-300 duration-300"}
        />
        <HomeIcon
          styles={"text-gray-100 row-start-3 hover:text-slate-300 duration-300"}
        />
        <LibraryIcon
          styles={
            "text-gray-100 row-start-4 flex justify-center items-center hover:text-slate-300 duration-300"
          }
        />
      </nav>
    </div>
  );
}
