import PlayMusicIcon from "../icons/playMusic-icon";
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

  return (
    <div className="group grid grid-cols-8 py-3 px-3 hover:bg-[#51515169] items-center duration-200 rounded-lg">
      <div className=" flex items-center text-base  w-full max-w-md text-ellipsis truncate col-span-3 relative">
        <img
          src={track.track.album.images[2].url}
          alt=""
          className="relative rounded-md w-[12%] mr-5 group-hover:-z-2"
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
      <div className="text-base col-span-2 text-ellipsis truncate">
        {track.track.album.name}
      </div>
      <div className="col-span-2 text-ellipsis truncate">
        <p className="text-base ">{track.added_at.substr(0, 10)}</p>
      </div>
      <div>
        <p className="text-base  text-start ">
          {mins}:{secs}
        </p>
      </div>
    </div>
  );
}
