import { createContext, useContext, useEffect, useState } from "react";
import PlaylistIcon from "./playlistIcon";
import PlaylistBody from "./playlistBody";

import Player from "./player";
import { playerContext } from "../App";

export const playlistContext = createContext();

export default function MainContent({ playlists, categories }) {
  const token = localStorage.getItem("token");
  console.log(playlists);
  const [playlistsTodisplay, setPlaylistsToDisplay] = useState();
  const [player, setPlayer] = useContext(playerContext);

  const [searchedTracks, setSearchedTracks] = useState();

  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchInputValue
    )}&type=track&limit=10&market=USA`;

    async function fetchSearchTracks(url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchedTracks(data.tracks.items.map((track) => ({ ...track })));
      }
    }
    searchInputValue && fetchSearchTracks(url);
    return fetchSearchTracks;
  }, [searchInputValue]);
  console.log(searchedTracks);
  const arrOfplaylists = playlists.map((playlistsArr) =>
    playlistsArr.map((playlist) => {
      if (typeof playlist === "object" && playlist != null) {
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
  console.log(player);
  return (
    <>
      {!playlistsTodisplay ? (
        <div className="w-full">
          <playlistContext.Provider value={setPlaylistsToDisplay}>
            <div className="w-11/12 fixed bg-[#000000] right-0 flex items-center justify-center h-[10%] z-10">
              <input
                type="search"
                className="w-1/2  bg-zinc-800 p-2 rounded-3xl text-white text-lg focus:outline-none"
                placeholder="Search"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
            <div className="relative h-4/5  w-full overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="w-11/12 bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] text-white grid grid-cols-4 gap-10  gap-y-10 rounded-2xl absolute right-0 pb-16 z-40 p-10">
                {arrOfplaylists}
              </div>
            </div>
          </playlistContext.Provider>
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
      {player && (
        <Player
          img={player.img}
          name={player.name}
          artist={player.artist}
          preview_url={player.preview_url}
        />
      )}
    </>
  );
}
