import { useEffect, useState } from "react";
import FavoriteIcon from "../icons/favorite-icon";
import HomeIcon from "../icons/home-icon";
import LibraryIcon from "../icons/library-icon";
import getPlaylist from "./getPlaylist";
import MainContent from "./mainContent";

export default function Home({ token, clientId, secretId }) {
  const [randomPlaylists, setRandomPlaylists] = useState([]);
  const categories = ["chill", "pop", "hiphop"];
  useEffect(() => {
    // const authOptions = {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // };

    // fetch(
    //   `https://api.spotify.com/v1/browse/categories/party/playlists`,
    //   authOptions
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data.playlists.items))
    //   .catch((err) => console.error(err));

    // fetch(`https://api.spotify.com/v1/playlists/${playlistId}`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    const refreshToken = localStorage.getItem("refresh_token");

    const fetchRefreshTokenOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + secretId),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    };

    fetch("https://accounts.spotify.com/api/token", fetchRefreshTokenOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.refreshToken) {
          localStorage.setItem("refresh_token", data.refreshToken);
        }
      });
  }, []);

  useEffect(() => {
    async function setPlaylist() {
      getPlaylist(token, categories).map((playlist) =>
        playlist.then((res) =>
          setRandomPlaylists((prev) => [...prev, res, categories])
        )
      );
    }
    return setPlaylist;
  }, []);
  // rgba(22,3,45,0.7344187675070029)
  return (
    <div className="bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] bg-gra h-screen w-screen flex overflow-x-hidden relative">
      <nav className="w-1/12 bg-[#000000] grid grid-rows-8 items-center justify-items-center fixed h-screen z-10">
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
      <MainContent playlists={randomPlaylists} />
    </div>
  );
}
