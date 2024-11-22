import { createContext, useEffect, useRef, useState } from "react";
import PlaylistIcon from "./playlistIcon";
import PlaylistBody from "./playlistBody";
import Navbar from "./navbar";

export const playlistContext = createContext();

export default function MainContent({ playlists, categories }) {
  const token = localStorage.getItem("token");
  const [playlistsTodisplay, setPlaylistsToDisplay] = useState();

  const [searchedTracks, setSearchedTracks] = useState();

  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchInputValue
    )}&type=track&limit=10`;

    async function fetchSearchTracks(url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSearchedTracks(data.tracks.items.map((track) => ({ ...track })));
    }
    fetchSearchTracks(url);
    return fetchSearchTracks;
  }, [searchInputValue]);
  console.log(searchedTracks);

  const arrOfplaylists = playlists.map((playlistsArr) =>
    playlistsArr.map((playlist) => {
      if (typeof playlist === "object") {
        return (
          <PlaylistIcon
            tracksUrl={playlist.tracks.href}
            id={playlist.id}
            externalURL={playlist.external_urls.spotify}
            name={playlist.name}
            images={playlist.images}
          />
        );
      } else {
        return (
          <h2 className="col-span-4 text-3xl uppercase italic">{playlist}</h2>
        );
      }
    })
  );

  return (
    <playlistContext.Provider value={setPlaylistsToDisplay}>
      {!playlistsTodisplay ? (
        <div>
          <div className="w-11/12 fixed bg-[#000000] right-0 flex items-center justify-center h-[10%] z-10">
            <input
              type="search"
              className="w-1/2  bg-zinc-800 p-2 rounded-3xl text-white text-lg focus:outline-none"
              placeholder="Search"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
          </div>
          <div className="w-10/12  text-white grid grid-cols-4 gap-10 mx-10 gap-y-10 mt-[7%] absolute right-0 pb-16 ">
            {arrOfplaylists}
          </div>
        </div>
      ) : (
        <>
          <PlaylistBody
            name={playlistsTodisplay.name}
            id={playlistsTodisplay.id}
            images={playlistsTodisplay.images}
            tracksUrl={playlistsTodisplay.tracksUrl}
          />
        </>
      )}
    </playlistContext.Provider>
  );
}
