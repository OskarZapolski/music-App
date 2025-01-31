import { useEffect, useContext, useState } from "react";
import { playerContext } from "../App";
export default function ProgerssBar({ duration }) {
  const accessToken = localStorage.getItem("token");
  const [
    player,
    setPlayer,
    isPlaying,
    setIsPlaying,
    setPrevUrl,
    prevUrl,
    playBackTime,
  ] = useContext(playerContext);
  const [timeLeft, setTimeLeft] = useState(Math.floor(duration / 1000));

  const currentSeconds =
    Math.floor((playBackTime / 1000) % 60) < 10
      ? "0" + Math.floor((playBackTime / 1000) % 60)
      : Math.floor((playBackTime / 1000) % 60);
  const currentMinutes = Math.floor(playBackTime / 60000);
  let durationSecond =
    Math.floor(timeLeft % 60) < 10
      ? "0" + Math.floor(timeLeft % 60)
      : Math.floor(timeLeft % 60);
  let durationMinute = Math.floor(timeLeft / 60);

  console.log(Math.floor(duration / 1000));

  const styleHr = {
    width: `${(playBackTime / duration) * 100}%`,
  };
  console.log((playBackTime / duration) * 100);
  useEffect(() => {
    setTimeLeft(Math.floor(duration / 1000) - Math.floor(playBackTime / 1000));
  }, [playBackTime]);

  useEffect(() => {
    const param = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function getCurrentTime() {
      fetch("https://api.spotify.com/v1/me/player", param)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
    getCurrentTime();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <span>
        {currentMinutes}:{currentSeconds}
      </span>
      <div className="w-1/2 mx-3 relative">
        <hr className="w-full h-1 bg-zinc-600 rounded-3xl border-zinc-600" />
        <hr
          style={styleHr}
          className=" bg-white h-1 z-10 absolute top-0 bg-white rounded-3xl"
        />
      </div>
      <span>
        {durationMinute}:{durationSecond}
      </span>
    </div>
  );
}
