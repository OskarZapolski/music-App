import { useEffect, useState } from "react";

import getPlaylist from "./getPlaylist";
import MainContent from "./mainContent";
import LoadingIcon from "./loadingIcon";
import Navbar from "./navbar";

export default function Home({ token, clientId, secretId }) {
  const [randomPlaylists, setRandomPlaylists] = useState([]);
  const categories = ["chill vibes", "pop", "rap", "rock"];

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");

    const fetchRefreshTokenOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + secretId),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    };

    // fetch("https://accounts.spotify.com/api/token", fetchRefreshTokenOptions)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.refreshToken) {
    //       localStorage.setItem("refresh_token", data.refreshToken);
    //     }
    //   });
  }, []);

  useEffect(() => {
    async function setPlaylist() {
      getPlaylist(token, categories).map((playlist) =>
        playlist.then((res) => {
          const arr = [];
          res.map((res) => {
            if (res != null) {
              if (arr.length < 5) {
                arr.push(res);
              }
            }
          });

          setRandomPlaylists((prev) => [...prev, arr]);
        })
      );
    }
    return setPlaylist;
  }, []);
  // rgba(22,3,45,0.7344187675070029)

  return (
    <>
      <Navbar />

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
