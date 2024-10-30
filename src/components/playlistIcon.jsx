import { useContext, useEffect, useState } from "react";
import { playlistContext } from "./mainContent";

export default function PlaylistIcon({
  id,
  externalURL,
  name,
  images,
  tracksUrl,
}) {
  const setPlaylistToDisplay = useContext(playlistContext);

  return (
    <div
      key={id}
      onClick={() => setPlaylistToDisplay({ id, name, images, tracksUrl })}
    >
      <a href={externalURL} target="_blank" rel="noopener noreferrer">
        <img src={images[0]?.url} alt={name} className="min-w-full" />
      </a>
    </div>
  );
}
