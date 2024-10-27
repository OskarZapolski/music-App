import { useEffect, useState } from "react";
import Playlist from "./playlist";

export default function MainContent({ playlists }) {
  const [playlistsTodisplay, setPlaylistsToDisplay] = useState([]);

  const arrOfplaylists = playlists.map((playlistsArr) =>
    playlistsArr.map((playlist) => (
      <Playlist
        id={playlist.id}
        externalURL={playlist.external_urls.spotify}
        name={playlist.name}
        images={playlist.images}
      />
    ))
  );

  return (
    <div className="w-100 h-100 text-white grid grid-cols-4 gap-10">
      {arrOfplaylists}
    </div>
  );
}
