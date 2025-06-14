import { useLocation } from "react-router-dom";
import { queueContext } from "../App";
import { useContext } from "react";

export default function PlayMusicIcon({
  setPlayer,
  track,
  playTrack,
  setPrevUrl,
  style,
  id,
  tracksArr,
}) {
  const location = useLocation();
  const { setQueueFromCurrentPlaylist } = useContext(queueContext);
  return (
    <svg
      className="w-[13%] xl:w-[57px] 2xl:w-[60px] hidden lg:group-hover:block fill-white absolute group-hover:bg-[#000000b8] p-[6px]"
      style={style}
      fill="#000000"
      height="60px"
      version="1.1"
      width="100px"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      onClick={() => {
        setPrevUrl(location.pathname);
        setPlayer({
          img: track.album.images[2].url,
          name: track.name,
          artist: track.artists[0].name,
          preview_url: track.preview_url,
          duration: track.duration_ms,
        });
        playTrack(track.uri);

        if (id && id >= 0) {
          setQueueFromCurrentPlaylist(id, tracksArr);
        }
      }}
    >
      <g>
        <path
          d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
        />
        <path
          d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
        />
      </g>
    </svg>
  );
}
