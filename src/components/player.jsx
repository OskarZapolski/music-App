import StartMusicIcon from "../icons/startMusic-icon";
import PreviousTrackIcon from "../icons/previousTrack-icon";
import NextTrackIcon from "../icons/nextTrack-icon";
import PauseTrackIcon from "../icons/pauseTrack-icon";
import { useEffect, useState } from "react";
export default function Player({ img, name, artist }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsPlaying(true);
  }, [img]);
  return (
    <div className="fixed bottom-0  lg:h-[15%] xl:h-[12%] w-full bg-stone-950 right-0 z-10 text-white font-sans grid grid-cols-3">
      <div className="mx-4 flex items-center h-full">
        <img src={img} alt="" className="w-[11%] rounded-lg mr-5 ml-5" />
        <div>
          <p>{name}</p>
          <p className="text-xs text-ellipsis truncate text-zinc-400">
            {artist}
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-around items-center mt-3 w-[45%] mx-auto">
          <PreviousTrackIcon />
          {!isPlaying ? (
            <StartMusicIcon setIsPlaying={setIsPlaying} />
          ) : (
            <PauseTrackIcon setIsPlaying={setIsPlaying} />
          )}
          <NextTrackIcon />
        </div>
      </div>
    </div>
  );
}
