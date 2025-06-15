import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import PlayMusicIcon from "../icons/playMusic-icon";
import Player from "./player";
import LoadingIcon from "../icons/loadingIcon";
import { playerContext } from "../App";
import { playTrackFunctionContext } from "../App";
import Track from "./track";
import { searchContext } from "../App";
import SearchMenu from "./searchMenu";
import { queueContext } from "../App";
import PhoneTrackSection from "./phoneTrackSection";

export default function PlaylistBody({
  setIsPlaying,
  isPlaying,
  setPrevUrl,
  prevUrl,
}) {
  const [tracksArr, setTracksArr] = useState();
  const [tracksToDisplay, setTracksToDisplay] = useState();
  const [player, setPlayer] = useContext(playerContext);
  const { showPhoneTrackSection, setShowPhoneTrackSection } =
    useContext(queueContext);

  const [
    playTrack,
    stopPlaying,
    resumePlaying,
    playNextTrack,
    playPreviousTrack,
  ] = useContext(playTrackFunctionContext);

  const [
    searchedTracks,
    setSearchedTracks,
    searchInputValue,
    setSearchInputValue,
    searchedTracksArr,
    setSearchedTrackArr,
    setToken,
    setContainerStyles,
  ] = useContext(searchContext);

  const accessToken = localStorage.getItem("token");

  const { id, name, images, tracksUrl } = useLocation().state;

  useEffect(() => {
    function fetchTracks() {
      fetch(tracksUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTracksArr(data.items));
    }
    fetchTracks();
    return fetchTracks;
  }, [accessToken]);

  useEffect(() => {
    function displayTrackData() {
      let id = -1;
      if (tracksArr) {
        setTracksToDisplay(
          tracksArr.map((track, i) => {
            id++;
            return (
              <Track
                key={i}
                track={track}
                setPrevUrl={setPrevUrl}
                setPlayer={setPlayer}
                playTrack={playTrack}
                id={id}
                tracksArr={tracksArr}
              />
            );
          })
        );
      }
    }
    displayTrackData();
  }, [tracksArr]);

  const inputStyle = {
    borderBottomLeftRadius: searchInputValue ? "0" : "1.5rem",
    borderBottomRightRadius: searchInputValue ? "0" : "1.5rem",
  };
  const stylePostion = {
    position: "fixed",
  };

  return (
    <>
      <Navbar isPlaying={isPlaying} setPrevUrl={setPrevUrl} prevUrl={prevUrl} />
      <div
        className={`fixed bottom-0 left-0 w-full h-[100vh] bg-[#2C2E3A] z-50  transition-transform duration-500 ease-in-out ${
          showPhoneTrackSection ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {player && (
          <PhoneTrackSection
            img={player.img2}
            name={player.name}
            artist={player.artist}
            preview_url={player.preview_url}
            stopPlaying={stopPlaying}
            resumePlaying={resumePlaying}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            prevUrl={prevUrl}
            duration={player.duration}
            playNextTrack={playNextTrack}
            playPreviousTrack={playPreviousTrack}
          />
        )}
      </div>
      {player && !showPhoneTrackSection && (
        <Player
          img={player.img}
          name={player.name}
          artist={player.artist}
          preview_url={player.preview_url}
          stopPlaying={stopPlaying}
          resumePlaying={resumePlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          prevUrl={prevUrl}
          duration={player.duration}
          playNextTrack={playNextTrack}
          playPreviousTrack={playPreviousTrack}
        />
      )}
      {tracksToDisplay && !showPhoneTrackSection ? (
        <>
          <SearchMenu
            setContainerStyles={setContainerStyles}
            setPlayer={setPlayer}
            setToken={setToken}
            stopPlaying={stopPlaying}
            inputStyle={inputStyle}
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            searchedTracksArr={searchedTracksArr}
            stylePos={stylePostion}
          />
          <div
            className="w-full sm:w-11/12 h-fit text-white mt-10 absolute right-0 pb-10 pl-5 sm:pl-10 bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] pt-20"
            onClick={() => {
              if (searchInputValue) setSearchInputValue("");
            }}
          >
            <div className="text-base sm:text-xl md:text-2xl text-white font-sans w-[95%] ">
              <div className="flex items-center pb-5 md:pb-10">
                <img src={images[0].url} alt="" className="w-1/4 md:w-1/6 " />
                <h1 className="ml-10 text-xl sm:text-3xl xl:text-5xl font-bold text-wrap truncate">
                  {name}
                </h1>
              </div>

              <div className="grid grid-cols-8 gap-y-4 px-3">
                <h2 className="col-span-8 sm:col-span-3 text-sm">Title</h2>
                <h2 className="sm:col-span-2 text-sm hidden sm:block">Album</h2>
                <h2 className="sm:col-span-2 text-sm hidden sm:block">
                  Added at
                </h2>
                <h2 className="text-start text-sm hidden sm:block">Duration</h2>
                <hr className="col-span-8 mb-5" />
              </div>
              {tracksToDisplay}
            </div>
          </div>
        </>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
