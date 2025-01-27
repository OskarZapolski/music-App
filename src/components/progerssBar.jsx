import { useEffect, useContext } from "react";
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

  const currentSeconds =
    Math.floor((playBackTime / 1000) % 60) < 10
      ? "0" + Math.floor((playBackTime / 1000) % 60)
      : Math.floor((playBackTime / 1000) % 60);
  const currentMinutes = Math.floor(playBackTime / 60000);
  const durationSecond =
    Math.floor((duration / 1000) % 60) < 10
      ? "0" + Math.floor((duration / 1000) % 60)
      : Math.floor((duration / 1000) % 60);
  const durationMinute = Math.floor(duration / 1000 / 60);

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
      <input type="range" className="w-1/2 range-thumb" />
      <span>
        {durationMinute}:{durationSecond}
      </span>
    </div>
  );
}
