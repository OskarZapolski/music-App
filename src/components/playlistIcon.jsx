import { useContext } from "react";
import { playlistContext } from "./mainContent";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlaylistIcon({
  id,
  externalURL,
  name,
  images,
  tracksUrl,
  isPlaying,
  setPrevUrl,
}) {
  const nav = useNavigate();
  const setPlaylistToDisplay = useContext(playlistContext);
  const location = useLocation();

  return (
    <div
      className="cursor-pointer"
      key={id}
      onClick={() => {
        setPrevUrl(location.pathname);
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
