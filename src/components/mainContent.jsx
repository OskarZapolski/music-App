import { createContext, useEffect, useState } from "react";
import PlaylistIcon from "./playlistIcon";
import PlaylistBody from "./playlistBody";
import Navbar from "./navbar";

export const playlistContext = createContext();

export default function MainContent({ playlists }) {
  const [playlistsTodisplay, setPlaylistsToDisplay] = useState();

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
      }
    })
  );

  return (
    <playlistContext.Provider value={setPlaylistsToDisplay}>
      {!playlistsTodisplay ? (
        <div className="w-10/12 h-100 text-white grid grid-cols-4 gap-10 mx-10 gap-y-16 mt-14 absolute right-0 pb-16">
          {arrOfplaylists}
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
