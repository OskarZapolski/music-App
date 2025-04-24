import PlayMusicIcon from "../icons/playMusic-icon";
import { useContext } from "react";
import { queueContext } from "../App";
export default function Track({
  track,
  setPlayer,
  setPrevUrl,
  playTrack,
  id,
  tracksArr,
}) {
  const mins = Math.floor(Math.floor(track.track.duration_ms / 1000) / 60);
  let secs = Math.floor((track.track.duration_ms / 1000) % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  const { setQueueFromCurrentPlaylist } = useContext(queueContext);
  return (
    <div className="group grid grid-cols-8 py-3 px-3 hover:bg-[#51515169] items-center duration-200 rounded-lg">
      <div className=" flex items-center text-base  w-full max-w-md text-ellipsis truncate col-span-8 sm:col-span-3 relative">
        <img
          src={track.track.album.images[2].url}
          alt=""
          className="relative rounded-md w-[13%] xl:w-[55px]  2xl:w-[60px]  mr-5 group-hover:-z-2"
          onClick={() => {
            console.log(1);
            setPrevUrl(location.pathname);
            setPlayer({
              img: track.track.album.images[2].url,
              img2: track.track.album.images[1].url,
              name: track.track.name,
              artist: track.track.artists[0].name,
              preview_url: track.track.preview_url,
              duration: track.track.duration_ms,
            });
            playTrack(track.track.uri);
            if (id && id >= 0) {
              console.log(id);
              setQueueFromCurrentPlaylist(id, tracksArr);
            }
          }}
        />
        <PlayMusicIcon
          setPlayer={setPlayer}
          track={track.track}
          playTrack={playTrack}
          setPrevUrl={setPrevUrl}
          id={id}
          tracksArr={tracksArr}
        />
        <p className="text-base   max-w-md text-ellipsis truncate">
          <p>{track.track.name}</p>
          <p className="text-[12px] text-gray-400">
            {track.track.artists[0].name}
          </p>
        </p>
      </div>
      <div className="text-base sm:col-span-2 text-ellipsis truncate hidden sm:block">
        {track.track.album.name}
      </div>
      <div className="sm:col-span-2 text-ellipsis truncate hidden sm:block">
        <p className="text-base ">{track.added_at.substr(0, 10)}</p>
      </div>
      <div>
        <p className="text-base  text-start hidden sm:block">
          {mins}:{secs}
        </p>
      </div>
    </div>
  );
}
