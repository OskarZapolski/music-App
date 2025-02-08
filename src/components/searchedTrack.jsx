import PlayMusicIcon from "../icons/playMusic-icon";
export default function SearchedTrack({
  artist,
  name,
  image,
  setPlayer,
  track,
  playTrack,
  setPrevUrl,
}) {
  const style = { width: "6%", height: "100%" };
  return (
    <div className="w-full m-auto text-white font-sans h-fit p-3 hover:bg-slate-700 duration-300 cursor-pointer group">
      <div className="flex relative">
        <img
          src={image}
          alt=""
          className="w-[6%] mr-5 group-hover:-z-2 relative rounded-md"
        />
        <PlayMusicIcon
          setPlayer={setPlayer}
          track={track}
          playTrack={playTrack}
          setPrevUrl={setPrevUrl}
          style={style}
        />
        <div>
          <p className="text-lg">{name}</p>
          <p className="text-sm text-gray-200 italic">{artist}</p>
        </div>
      </div>
    </div>
  );
}
