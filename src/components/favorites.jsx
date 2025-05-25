import Navbar from "./navbar";
import SearchMenu from "./searchMenu";
import {
  searchContext,
  playerContext,
  favoriteContext,
  playTrackFunctionContext,
  queueContext,
} from "../App";
import { useContext, useEffect, useState } from "react";
import Track from "./track";
import Player from "./player";
import PhoneTrackSection from "./phoneTrackSection";

export default function Favorites({ token }) {
  const [tracksToDisplay, setTracksToDisplay] = useState();

  const [
    searchedTracks,
    setSearchedTracks,
    searchInputValue,
    setSearchInputValue,
    searchedTracksArr,
    setSearchedTrackArr,
  ] = useContext(searchContext);

  const [player, setPlayer, isPlaying, setIsPlaying, setPrevUrl, prevUrl] =
    useContext(playerContext);

  const { favoriteTracks } = useContext(favoriteContext);

  const { showPhoneTrackSection, setShowPhoneTrackSection } =
    useContext(queueContext);

  const [
    playTrack,
    stopPlaying,
    resumePlaying,
    playNextTrack,
    playPreviousTrack,
  ] = useContext(playTrackFunctionContext);

  const style = {
    height: !player && "100%",
  };

  useEffect(() => {
    function displayFavoriteTracks() {
      let id = -1;
      if (favoriteTracks) {
        return favoriteTracks.map((track, i) => {
          id++;
          return (
            <Track
              key={i}
              track={track}
              setPrevUrl={setPrevUrl}
              setPlayer={setPlayer}
              playTrack={playTrack}
              id={id}
              tracksArr={favoriteTracks}
            />
          );
        });
      }
    }
    setTracksToDisplay(displayFavoriteTracks());
  }, [favoriteTracks]);

  return (
    <div className="w-full">
      <Navbar isPlaying={isPlaying} prevUrl={prevUrl} setPrevUrl={setPrevUrl} />
      <SearchMenu
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        searchedTracksArr={searchedTracksArr}
      />
      {showPhoneTrackSection && (
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

      <div
        style={style}
        className="relative h-full  min-w-full overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-20"
        onClick={() => {
          if (searchInputValue) setSearchInputValue("");
        }}
      >
        <div className=" w-[100vw] sm:w-11/12  bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] text-white  rounded-2xl absolute right-0 pb-24 z-40 p-10 h-100vh">
          <div className="flex items-center mb-5">
            <img src="favorites-playlist.jpg" className="w-1/4 md:w-1/6" />
            <h1 className="text-white text-5xl ml-10">Favorites</h1>
          </div>
          <div className="grid grid-cols-8">
            <h2 className="col-span-8 sm:col-span-3 text-sm mb-3">Title</h2>
            <h2 className="sm:col-span-2 text-sm hidden sm:block">Album</h2>
            <h2 className="sm:col-span-2 text-sm hidden sm:block">Added at</h2>
            <h2 className="text-start text-sm hidden sm:block">Duration</h2>
          </div>
          <hr className="col-span-8 mb-5" />
          {tracksToDisplay}
        </div>
      </div>
    </div>
  );
}
