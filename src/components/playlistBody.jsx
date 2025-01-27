import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import PlayMusicIcon from "../icons/playMusic-icon";
import Player from "./player";
import LoadingIcon from "../icons/loadingIcon";
import { playerContext } from "../App";
import { playTrackFunctionContext } from "../App";
import Track from "./track";

export default function PlaylistBody({
  setIsPlaying,
  isPlaying,
  setPrevUrl,
  prevUrl,
}) {
  const [tracksArr, setTracksArr] = useState();
  const [tracksToDisplay, setTracksToDisplay] = useState();
  const [player, setPlayer] = useContext(playerContext);
  const [playTrack, stopPlaying, resumePlaying] = useContext(
    playTrackFunctionContext
  );

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
  }, []);

  useEffect(() => {
    function displayTrackData() {
      if (tracksArr) {
        setTracksToDisplay(
          tracksArr.map((track) => {
            return (
              <Track
                track={track}
                setPrevUrl={setPrevUrl}
                setPlayer={setPlayer}
                playTrack={playTrack}
              />
            );
          })
        );
      }
    }
    displayTrackData();
  }, [tracksArr]);

  return (
    <>
      <Navbar isPlaying={isPlaying} setPrevUrl={setPrevUrl} prevUrl={prevUrl} />
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
        />
      )}
      {tracksToDisplay ? (
        <div className="w-11/12 h-fit text-white mt-10 absolute right-0 pb-10 pl-10 bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)]">
          <div className="text-2xl text-white font-sans w-[95%]">
            <div className="flex items-center">
              <img src={images[0].url} alt="" className="w-1/6 pb-10" />
              <h1 className="ml-10 text-6xl font-bold text-ellipsis truncate">
                {name}
              </h1>
            </div>

            <div className="grid grid-cols-8 gap-y-4 px-3">
              <h2 className="col-span-3 text-sm">Title</h2>
              <h2 className="col-span-2 text-sm">Album</h2>
              <h2 className="col-span-2 text-sm">Added at</h2>
              <h2 className="text-start text-sm">Duration</h2>
              <hr className="col-span-8 mb-5" />
            </div>
            {tracksToDisplay}
          </div>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
