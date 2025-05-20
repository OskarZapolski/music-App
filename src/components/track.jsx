import PlayMusicIcon from "../icons/playMusic-icon";
import { useContext, useEffect, useState } from "react";
import { queueContext } from "../App";
import FavoriteIcon from "../icons/favorite-icon";
import { favoriteContext } from "../App";
export default function Track({
  track,
  setPlayer,
  setPrevUrl,
  playTrack,
  id,
  tracksArr,
}) {
  const [heartColor, setHeartColor] = useState(false);
  const mins = Math.floor(Math.floor(track.track.duration_ms / 1000) / 60);
  let secs = Math.floor((track.track.duration_ms / 1000) % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  const { setQueueFromCurrentPlaylist } = useContext(queueContext);
  const { setFavoriteTracks, favoriteTracks, addToFavorite } =
    useContext(favoriteContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (favoriteTracks) {
      const isThereTrack = favoriteTracks.some(
        (ftrack) => ftrack.track.id == track.track.id
      );
      setHeartColor(isThereTrack);
    }
  }, [favoriteTracks]);

  return (
    <div className="group sm:grid grid-cols-8 py-3 px-3 hover:bg-[#51515169] items-center duration-200 rounded-lg flex">
      <div className=" flex items-center text-base  w-full max-w-md text-ellipsis truncate col-span-6 sm:col-span-3 relative ">
        <img
          src={track.track.album.images[2].url}
          alt=""
          className="relative rounded-md w-[13%] xl:w-[55px]  2xl:w-[60px]  mr-5 group-hover:-z-2"
          onClick={() => {
            console.log(1);
            setPrevUrl(location.pathname);
            setPlayer({
              img: track.track.album.images[2].url,
              img2: track.track.album.images[1].url,
              name: track.track.name,
              artist: track.track.artists[0].name,
              preview_url: track.track.preview_url,
              duration: track.track.duration_ms,
            });
            playTrack(track.track.uri);
            if (id && id >= 0) {
              console.log(id);
              setQueueFromCurrentPlaylist(id, tracksArr);
            }
          }}
        />
        <PlayMusicIcon
          setPlayer={setPlayer}
          track={track.track}
          playTrack={playTrack}
          setPrevUrl={setPrevUrl}
          id={id}
          tracksArr={tracksArr}
        />
        <p className="text-base   max-w-md text-ellipsis truncate w-3/4">
          <p>{track.track.name}</p>
          <p className="text-[12px] text-gray-400">
            {track.track.artists[0].name}
          </p>
        </p>
      </div>
      <div className="text-base sm:col-span-2 text-ellipsis truncate hidden sm:block">
        {track.track.album.name}
      </div>
      <div className="sm:col-span-2 text-ellipsis truncate hidden sm:block">
        <p className="text-base ">{track.added_at.substr(0, 10)}</p>
      </div>
      <div className="flex justify-around">
        <p className="text-base  text-start hidden sm:block ">
          {mins}:{secs}
        </p>
        <FavoriteIcon
          styles={`w-[25px] h-[25px] ${
            heartColor ? "text-white" : "text-gray-600"
          } hover:scale-110 cursor-pointer duration-100`}
          addToFavorite={addToFavorite}
          track={track}
          heartColor={heartColor}
          setHeartColor={setHeartColor}
        />
      </div>
    </div>
  );
}
