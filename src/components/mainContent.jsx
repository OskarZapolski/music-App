import { createContext, useContext, useEffect, useState, useRef } from "react";
import PlaylistIcon from "./playlistIcon";
import PlaylistBody from "./playlistBody";
import Player from "./player";
import { playerContext } from "../App";
import SearchedTrack from "./searchedTrack";
import { playTrackFunctionContext } from "../App";
import SearchMenu from "./searchMenu";
import { searchContext } from "../App";
import { useSearchParams, useNavigate } from "react-router-dom";
import CategoryPlaylists from "./CategoryPlaylists";
import { queueContext } from "../App";
import PhoneTrackSection from "./phoneTrackSection";

export const playlistContext = createContext();

export default function MainContent({ playlists, categories }) {
  const token = localStorage.getItem("token");

  const [searchParam] = useSearchParams();
  const nav = useNavigate();
  useEffect(() => {
    nav("/music-App/");
  }, []);

  const [playlistsTodisplay, setPlaylistsToDisplay] = useState();
  const [player, setPlayer, isPlaying, setIsPlaying, setPrevUrl, prevUrl] =
    useContext(playerContext);
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
  const { showPhoneTrackSection, setShowPhoneTrackSection } =
    useContext(queueContext);
  const [
    playTrack,
    stopPlaying,
    resumePlaying,
    playNextTrack,
    playPreviousTrack,
  ] = useContext(playTrackFunctionContext);

  const arrOfplaylists = playlists.map((playlistsArr) =>
    playlistsArr.map((playlist) => {
      if (typeof playlist === "object" && playlist != null) {
        return (
          <PlaylistIcon
            tracksUrl={playlist.tracks.href}
            id={playlist.id}
            externalURL={playlist.external_urls.spotify}
            name={playlist.name}
            images={playlist.images}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPrevUrl={setPrevUrl}
          />
        );
      } else {
        return (
          <h2 className="col-span-4 lg:col-span-6 text-3xl uppercase italic">
            {playlist}
          </h2>
        );
      }
    })
  );

  const categoryPlaylists = arrOfplaylists.map((arr, index) => {
    return <CategoryPlaylists arr={arr} index={index} />;
  });

  const style = {
    height: !player && "100%",
  };

  return (
    <>
      {showPhoneTrackSection ? (
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
      ) : !playlistsTodisplay ? (
        <div className="w-full">
          <playlistContext.Provider value={{ setPlaylistsToDisplay }}>
            <SearchMenu
              setContainerStyles={setContainerStyles}
              setPlayer={setPlayer}
              setToken={setToken}
              stopPlaying={stopPlaying}
              searchInputValue={searchInputValue}
              setSearchInputValue={setSearchInputValue}
              searchedTracksArr={searchedTracksArr}
            />

            <div
              style={style}
              className="relative h-full  min-w-full overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-5"
              onClick={() => {
                if (searchInputValue) setSearchInputValue("");
              }}
            >
              <div className=" w-[100vw] sm:w-11/12  bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] text-white  rounded-2xl absolute right-0 pb-24 z-40 p-10 h-100vh">
                {categoryPlaylists}
              </div>
            </div>
          </playlistContext.Provider>
        </div>
      ) : (
        <div>
          <PlaylistBody setIsPlaying={setIsPlaying} />
        </div>
      )}
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
          duration={player.duration}
          playNextTrack={playNextTrack}
          playPreviousTrack={playPreviousTrack}
        />
      )}
    </>
  );
}
