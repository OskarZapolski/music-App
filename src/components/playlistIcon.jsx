import { useContext } from "react";
import { playlistContext } from "./mainContent";
import { useNavigate } from "react-router-dom";

export default function PlaylistIcon({
  id,
  externalURL,
  name,
  images,
  tracksUrl,
  isPlaying,
}) {
  const nav = useNavigate();
  const setPlaylistToDisplay = useContext(playlistContext);

  return (
    <div
      className="cursor-pointer"
      key={id}
      onClick={() => {
        nav("/playlist", {
          state: { id, name, images, tracksUrl, isPlaying },
        });
        setPlaylistToDisplay({
          id,
          name,
          images,
          tracksUrl,
        });
      }}
    >
      <img src={images[0]?.url} alt={name} className="min-w-full" />
    </div>
  );
}
