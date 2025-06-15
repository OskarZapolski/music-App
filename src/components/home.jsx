import { useEffect, useState } from "react";

import getPlaylist from "./getPlaylist";
import MainContent from "./mainContent";
import LoadingIcon from "../icons/loadingIcon";
import Navbar from "./navbar";

export default function Home({ token, clientId, isPlaying }) {
  const [randomPlaylists, setRandomPlaylists] = useState([]);
  const categories = ["chill vibes", "pop", "rap", "rock"];

  // useEffect(() => {
  //   const refreshToken = localStorage.getItem("refresh_token");

  //   const fetchRefreshTokenOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: "Basic " + btoa(clientId + ":" + secretId),
  //     },
  //     body: new URLSearchParams({
  //       grant_type: "refresh_token",
  //       refresh_token: refreshToken,
  //     }),
  //   };
  // }, [token]);

  useEffect(() => {
    async function setPlaylist() {
      getPlaylist(token, categories).map((playlist) =>
        playlist.then((res) => {
          const arr = [];
          res.map((res) => {
            if (res != null) {
              if (arr.length < 7) {
                arr.push(res);
              }
            }
          });

          setRandomPlaylists((prev) => [...prev, arr]);
        })
      );
    }
    setPlaylist();
    return setPlaylist;
  }, [token]);
  // rgba(22,3,45,0.7344187675070029)

  return (
    <>
      <Navbar isPlaying={isPlaying} />

      {randomPlaylists ? (
        <>
          <MainContent playlists={randomPlaylists} categories={categories} />
        </>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
