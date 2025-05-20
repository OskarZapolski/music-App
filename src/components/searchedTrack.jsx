import PlayMusicIcon from "../icons/playMusic-icon";
import { useContext, useState, useEffect } from "react";
import { queueContext } from "../App";
import FavoriteIcon from "../icons/favorite-icon";
import { favoriteContext } from "../App";
export default function SearchedTrack({
  artist,
  name,
  image,
  setPlayer,
  track,
  playTrack,
  setPrevUrl,
  setSearchInputValue,
}) {
  const { setQueueFromCurrentPlaylist } = useContext(queueContext);
  const { addToFavorite, favoriteTracks } = useContext(favoriteContext);
  const style = { height: "100%" };
  const [heartColor, setHeartColor] = useState(false);
  useEffect(() => {
    if (favoriteTracks) {
      const isThereTrack = favoriteTracks.some(
        (ftrack) => ftrack.track.id == track.id
      );
      setHeartColor(isThereTrack);
    }
  }, [favoriteTracks]);
  const track2 = { track: { ...track } };
  return (
    <div className="w-full m-auto text-white font-sans h-fit p-3 hover:bg-slate-700 duration-300 cursor-pointer group">
      <div className="flex relative items-center">
        <div className="w-fit">
          <img
            src={image}
            alt=""
            className=" w-[90%] xl:w-[57px]  2xl:w-[60px] xl:mr-2 group-hover:-z-2 relative rounded-md"
            onClick={() => {
              setPrevUrl(location.pathname);
              setPlayer({
                img: track.album.images[2].url,
                name: track.name,
                artist: track.artists[0].name,
                preview_url: track.preview_url,
                duration: track.duration_ms,
              });
              playTrack(track.uri);
              // if (id && id >= 0) {
              //   console.log(id);
              //   setQueueFromCurrentPlaylist(id, tracksArr);
              // }
              setSearchInputValue("");
              console.log(1);
            }}
          />
        </div>
        <PlayMusicIcon
          setPlayer={setPlayer}
          track={track}
          playTrack={playTrack}
          setPrevUrl={setPrevUrl}
          style={style}
        />
        <div className="w-3/4">
          <p className="text-sm md:text-lg">{name}</p>
          <p className="text-xs text-gray-200 italic">{artist}</p>
        </div>
        <FavoriteIcon
          styles={`w-[25px] h-[25px] z-50 ${
            heartColor ? "text-white" : "text-gray-500"
          } hover:scale-110 cursor-pointer duration-100`}
          addToFavorite={addToFavorite}
          track={track2}
          heartColor={heartColor}
          setHeartColor={setHeartColor}
        />
      </div>
    </div>
  );
}
