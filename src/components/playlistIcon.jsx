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
      className="cursor-pointer hover:scale-105 duration-150 w-full sm:mx-5 flex items-center"
      key={id}
      onClick={() => {
        setPrevUrl(location.pathname);
        nav("/music-App/playlist", {
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
