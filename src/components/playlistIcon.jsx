import { useContext, useEffect, useState } from "react";
import { playlistContext } from "./mainContent";
import { useNavigate } from "react-router-dom";

export default function PlaylistIcon({
  id,
  externalURL,
  name,
  images,
  tracksUrl,
}) {
  const nav = useNavigate();
  const setPlaylistToDisplay = useContext(playlistContext);

  return (
    <div
      key={id}
      onClick={() => {
        setPlaylistToDisplay({ id, name, images, tracksUrl });
        nav("/playlist", { state: { id, name, images, tracksUrl } });
      }}
    >
      <img src={images[0]?.url} alt={name} className="min-w-full" />
    </div>
  );
}
