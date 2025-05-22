import StartMusicIcon from "../icons/startMusic-icon";
import PreviousTrackIcon from "../icons/previousTrack-icon";
import NextTrackIcon from "../icons/nextTrack-icon";
import PauseTrackIcon from "../icons/pauseTrack-icon";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProgerssBar from "./progerssBar";
import LoudSpeakerIcon from "../icons/loudSpeaker-icon";
import { playerContext, queueContext } from "../App";
import PhoneTrackSection from "./phoneTrackSection";

export default function Player({
  img,
  name,
  artist,
  stopPlaying,
  resumePlaying,
  playNextTrack,
  playPreviousTrack,

  duration,
}) {
  const volumeBar = useRef();
  const location = useLocation().pathname;
  const [volume, setVolume] = useState(0.3);
  const { showPhoneTrackSection, setShowPhoneTrackSection } =
    useContext(queueContext);

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

  useEffect(() => {
    if (location == prevUrl) {
      setIsPlaying(true);
    }
  }, [img]);

  function changeVolume(e) {
    setVolume(e.nativeEvent.offsetX / volumeBar.current.offsetWidth);
    console.log();
    playerSDK
      .setVolume(e.nativeEvent.offsetX / volumeBar.current.offsetWidth)
      .then((res) => console.log("changed"));
  }
  const volumeStyle = {
    width: `${Math.floor(volume * 100)}%`,
  };

  function soundIconHandler() {
    console.log(volume);
    if (volume > 0) {
      setVolume(0);
      playerSDK.setVolume(0);
    } else if (volume == 0) {
      playerSDK.setVolume(0.3);
      setVolume(0.3);
    }
  }

  return (
    <>
      <div className="fixed bottom-[8vh] sm:bottom-0 h-[10%]  sm:h-[13%] xl:h-[12%] w-full bg-stone-950 right-0 z-10 text-white font-sans grid md:grid-cols-3">
        <div className="sm:mx-4 flex items-center h-full">
          <img
            src={img}
            alt=""
            className="w-[13%] sm:w-[11%] rounded-lg mr-5 ml-5"
            onClick={() => {
              if (window.innerWidth <= 640) {
                setShowPhoneTrackSection(true);
              }
            }}
          />
          <div>
            <p>{name}</p>
            <p className="text-xs text-ellipsis truncate text-zinc-400">
              {artist}
            </p>
          </div>
        </div>
        <div className=" hidden sm:block ">
          <div className=" justify-around items-center mt-3 w-[45%] mx-auto sm:flex hidden">
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
        <div className="  justify-end items-center pr-10 sm:flex hidden">
          <LoudSpeakerIcon soundIconHandler={soundIconHandler} />
          <div className=" w-1/4 h-2 relative">
            <hr
              ref={volumeBar}
              className=" w-full h-full bg-zinc-600 border-zinc-600 rounded-2xl -z-10 cursor-pointer"
              onClick={(e) => changeVolume(e)}
            />
            <hr
              style={volumeStyle}
              className="absolute z-10 h-full bg-white border-white rounded-2xl top-0 cursor-pointer"
              onClick={(e) => changeVolume(e)}
            />
          </div>
        </div>
        <hr className="block sm:hidden" />
      </div>
    </>
  );
}
