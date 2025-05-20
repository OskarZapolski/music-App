import Navbar from "./navbar";
import SearchMenu from "./searchMenu";
import {
  searchContext,
  playerContext,
  favoriteContext,
  playTrackFunctionContext,
} from "../App";
import { useContext } from "react";
import Track from "./track";
import Player from "./player";

export default function Favorites({ token }) {
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
  console.log(favoriteTracks);

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

  function displayFavoriteTracks() {
    let id = -1;
    if (favoriteTracks) {
      return favoriteTracks.map((track) => {
        id++;
        return (
          <Track
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
  const favoriteTracksToDisplay = displayFavoriteTracks();
  console.log(favoriteTracksToDisplay);
  return (
    <div className="w-full">
      <Navbar isPlaying={isPlaying} prevUrl={prevUrl} setPrevUrl={setPrevUrl} />
      <SearchMenu
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        searchedTracksArr={searchedTracksArr}
      />
      {player && (
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
            <img src="favorites-playlist.jpg" className="w-[14%] " />
            <h1 className="text-white text-5xl ml-10">Favorites</h1>
          </div>
          {favoriteTracksToDisplay}
        </div>
      </div>
    </div>
  );
}
