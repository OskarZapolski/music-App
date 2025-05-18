import Navbar from "./navbar";
import StartMusicIcon from "../icons/startMusic-icon";
import PreviousTrackIcon from "../icons/previousTrack-icon";
import NextTrackIcon from "../icons/nextTrack-icon";
import PauseTrackIcon from "../icons/pauseTrack-icon";
import { useContext } from "react";
import { playerContext } from "../App";
import ProgerssBar from "./progerssBar";
import GoBackIcon from "../icons/goBack-icon";

export default function PhoneTrackSection({
  img,
  name,
  artist,
  stopPlaying,
  resumePlaying,
  playNextTrack,
  playPreviousTrack,
  duration,
}) {
  const [
    player,
    setPlayer,
    isPlaying,
    setIsPlaying,
    setPrevUrl,
    prevUrl,
    playBackTime,
    setPlayBackTime,
    playerSDK,
  ] = useContext(playerContext);

  return (
    <div className="bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] h-full w-full z-50 absolute p-10">
      <GoBackIcon />
      {/* <Navbar /> */}
      <div className="text-center">
        <img src={img} alt="" className="w-[85%] mx-auto pt-[22%] rounded-xl" />
        <h2 className="text-white text-3xl mt-10">{name}</h2>
        <p className="text-gray-300 italic mt-[5%] text-xl">{artist}</p>
        <div>
          <div className="flex justify-between items-center mt-[10%] w-[55%] mx-auto mb-4">
            <PreviousTrackIcon
              playPreviousTrack={playPreviousTrack}
              setIsPlaying={setIsPlaying}
            />
            {!isPlaying ? (
              <StartMusicIcon
                setIsPlaying={setIsPlaying}
                resumePlaying={resumePlaying}
              />
            ) : (
              <PauseTrackIcon
                setIsPlaying={setIsPlaying}
                stopPlaying={stopPlaying}
              />
            )}
            <NextTrackIcon
              playNextTrack={playNextTrack}
              setIsPlaying={setIsPlaying}
            />
          </div>
          <ProgerssBar duration={duration} />
        </div>
      </div>
    </div>
  );
}
