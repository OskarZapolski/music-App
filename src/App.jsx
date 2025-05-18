import { useEffect, useState, createContext } from "react";
import "./App.css";
import LogIn from "./components/login";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Home from "./components/home";
import PlaylistBody from "./components/playlistBody";
import SearchedTrack from "./components/searchedTrack";

export const playerContext = createContext();
export const playTrackFunctionContext = createContext();
export const searchContext = createContext();
export const queueContext = createContext();
export const favoriteContext = createContext();

function App() {
  const [code, setCode] = useState("");

  const [token, setToken] = useState("");
  const [player, setPlayer] = useState();
  const [playerSDK, setPlayerSDK] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceId, setDeviceId] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [prevUrl, setPrevUrl] = useState("/");
  const [playBackTime, setPlayBackTime] = useState(0);
  const [searchedTracks, setSearchedTracks] = useState();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchedTracksArr, setSearchedTrackArr] = useState([]);
  const [playlistQueue, setPlaylistQueue] = useState([]);
  const [queTrackIndex, setQueTrackIndex] = useState(0);
  const [showPhoneTrackSection, setShowPhoneTrackSection] = useState(false);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const clientId = "aa11595a5869411eacc30f6af0af738d";
  const secretId = "3e867675d0254603a866f88d98ad3820";
  //glosnosc phone i slide jak klikasz na iconke piosenki
  // zrob aby na telefonie w playlistach nie bylo tej iconki play i aby kolejka dzialala

  console.log(playlistQueue);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode) {
      setCode(authCode);
    }
  }, []);

  async function refreshAccessToken() {
    console.log("a");
    const refresh_token = localStorage.getItem("refreshToken");
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          client_id: clientId,
          client_secret: secretId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get refresh token");
      }
      const data = await response.json();
      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token
        ? data.refresh_token
        : refresh_token;

      console.log(data);

      setToken(newAccessToken);
      localStorage.setItem("token", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    } catch (err) {
      console.error("error refresh token ", err);
    }
  }

  async function exchangeCodeForToken(authCode) {
    const redirect_uri = "http://localhost:5173/";

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: redirect_uri,
      client_id: clientId,
      client_secret: secretId,
    });

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      console.log(response);

      const data = await response.json();
      console.log("Access Token:", data.access_token);
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      console.log("Refresh Token:", data.refresh_token);
    } catch (error) {
      console.error("Error getting token:", error);
    }
  }
  console.log(favoriteTracks);
  useEffect(() => {
    if (!token) return;
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 3500000);

    return () => clearInterval(refreshInterval);
  }, [token]);

  useEffect(() => {
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [code]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setFavoriteTracks(data.items))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;

    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];

      localStorage.setItem("token", _token);

      setToken(_token);
    } else {
      setToken(token);
    }
  }, []);

  // playerSDKEventsHandler();
  useEffect(() => {
    const tokenSDK =
      "BQBQD94CgKMyoGYG_tHmTaFMM9lWbhrf7mCGIZ6lNLXytgBcc7UPX92zJGlG19tMuS8Bn-72tjnSd4uRLDEtOBbk_3hhQAkMqaHSMa_Sv04ojb4F9ltlOXfxA9wmQrbgXcoUDvrF2_aW0PXKugEaVJI0Db_TRIND2CqwKUpRK1u1mR6y8bHOmAvDW2I3ZHA_VAwdZ833ZzXj7SykYW3GadMtL8aS4rZRYh6MvlYVXa-lXxFKIYui9vEwe6wKpYB0HaSi";
    let playerCheckInterval;
    function checkForPlayer() {
      if (window.Spotify !== null) clearInterval(playerCheckInterval);
    }
    function handleLogin() {
      if (!tokenSDK) {
        playerCheckInterval = setInterval(() => checkForPlayer(), 1000);
      }
    }
    handleLogin();

    window.onSpotifyWebPlaybackSDKReady = () => {
      const PLAYER = new window.Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb) => {
          cb(tokenSDK);
        },
        volume: 0.3,
      });

      PLAYER.addListener("not_ready", ({ device_id }) => {
        console.log("not", device_id);
        setIsConnected(false);
      });
      PLAYER.addListener("player_state_changed", (state) => {});
      PLAYER.addListener("ready", ({ device_id }) => {
        console.log(1);
        setDeviceId(device_id);
        setIsConnected(true);
      });
      PLAYER.addListener("initialization_error", ({ message }) => {
        console.error("Initialization error:", message);
      });

      PLAYER.addListener("account_error", ({ message }) => {
        console.error("Account error:", message);
      });

      // PLAYER.addListener("playback_error", ({ message }) => {
      //   console.error("Playback error:", message);
      // });
      PLAYER.addListener("authentication_error", ({ message }) => {
        console.log(2);
        console.error("Authentication error:", message);
      });

      PLAYER.connect();
      setPlayerSDK(PLAYER);
    };

    return () => {
      if (playerSDK) {
        playerSDK.disconnect();
      }
    }; //153600
  }, [window.Spotify]);
  console.log(isPlaying);
  function playNextTrack() {
    playTrack(playlistQueue[queTrackIndex + 1].track.uri);

    setPlayer({
      img: playlistQueue[queTrackIndex + 1].track.album.images[2].url,
      img2: playlistQueue[queTrackIndex + 1].track.album.images[1].url,
      name: playlistQueue[queTrackIndex + 1].track.name,
      artist: playlistQueue[queTrackIndex + 1].track.artists[0].name,
      preview_url: playlistQueue[queTrackIndex + 1].track.preview_url,
      duration: playlistQueue[queTrackIndex + 1].track.duration_ms,
    });
    setQueTrackIndex((prev) => (prev += 1));
  }
  function playPreviousTrack() {
    if (player && playlistQueue) {
      playTrack(playlistQueue[queTrackIndex - 1].track.uri);
      setPlayer({
        img: playlistQueue[queTrackIndex - 1].track.album.images[2].url,
        img2: playlistQueue[queTrackIndex - 1].track.album.images[1].url,
        name: playlistQueue[queTrackIndex - 1].track.name,
        artist: playlistQueue[queTrackIndex - 1].track.artists[0].name,
        preview_url: playlistQueue[queTrackIndex - 1].track.preview_url,
        duration: playlistQueue[queTrackIndex - 1].track.duration_ms,
      });
      setQueTrackIndex((prev) => (prev -= 1));
    }
  }
  useEffect(() => {
    if (player && playlistQueue && player.duration - playBackTime < 1000) {
      playNextTrack();
    }
  }, [playBackTime]);

  async function playTrack(trackUri) {
    console.log(trackUri);
    const apiUrl = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
    const requestBody = {
      uris: [trackUri],

      play: true,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("playing");
      } else {
        console.log("err");
      }
    } catch (err) {
      console.error(err, "eroor");
    }
  }

  useEffect(() => {
    function getPlaybackTime() {
      if (!playerSDK) return;
      const interval = setInterval(async () => {
        const state = await playerSDK.getCurrentState();
        if (state && !state.paused) {
          setPlayBackTime(state.position);
        }
      }, 1000);
      if (!isPlaying) clearInterval(interval);
      return () => clearInterval(interval);
    }
    getPlaybackTime();
  }, [playerSDK]);

  async function stopPlaying() {
    try {
      await playerSDK.pause();
    } catch (err) {
      console.error(err);
    }
  }
  async function resumePlaying() {
    try {
      await playerSDK.resume();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchInputValue
    )}&type=track&limit=5&market=USA`;

    async function fetchSearchTracks(url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchedTracks(data.tracks.items.map((track) => ({ ...track })));
      }
    }
    searchInputValue && fetchSearchTracks(url);
    return fetchSearchTracks;
  }, [searchInputValue]);

  useEffect(() => {
    if (searchedTracks) {
      const arr = searchedTracks.map((track) => {
        console.log(track);
        return (
          <SearchedTrack
            artist={track.artists[0].name}
            name={track.name}
            image={track.album.images[2].url}
            setPlayer={setPlayer}
            track={track}
            playTrack={playTrack}
            setPrevUrl={setPrevUrl}
            setSearchInputValue={setSearchInputValue}
          />
        );
      });
      setSearchedTrackArr(arr);
    }
  }, [searchedTracks]);

  // useEffect(() => {
  //   async function checkConnection() {
  //     try {
  //       const connectionStatus = await playerSDK.isConnected();
  //       console.log(connectionStatus);
  //     } catch (err) {
  //       console.error("error", err);
  //     }
  //   }
  //   checkConnection();
  // }, [playerSDK]);

  function setQueueFromCurrentPlaylist(id, tracksArr) {
    if (id < tracksArr.length) {
      const arr = tracksArr.slice(id);

      setPlaylistQueue(arr);
    }
  }

  const containerStyles = {
    height: player ? (showPhoneTrackSection ? "100vh" : "88vh") : "full",
  };

  return (
    <div className="font-normal">
      <div
        style={containerStyles}
        className="bg-black bg-gra h-[100vh] w-screen flex overflow-x-hidden relative scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent"
      >
        {!token ? (
          <LogIn />
        ) : (
          <BrowserRouter>
            <queueContext.Provider
              value={{
                setQueueFromCurrentPlaylist,
                showPhoneTrackSection,
                setShowPhoneTrackSection,
              }}
            >
              <searchContext.Provider
                value={[
                  searchedTracks,
                  setSearchedTracks,
                  searchInputValue,
                  setSearchInputValue,
                  searchedTracksArr,
                  setSearchedTrackArr,
                ]}
              >
                <playTrackFunctionContext.Provider
                  value={[
                    playTrack,
                    stopPlaying,
                    resumePlaying,
                    playNextTrack,
                    playPreviousTrack,
                  ]}
                >
                  <playerContext.Provider
                    value={[
                      player,
                      setPlayer,
                      isPlaying,
                      setIsPlaying,
                      setPrevUrl,
                      prevUrl,
                      playBackTime,
                      setPlayBackTime,
                      playerSDK,
                    ]}
                  >
                    <favoriteContext.Provider
                      value={{ setFavoriteTracks, favoriteTracks }}
                    >
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Home
                              token={token}
                              clientId={clientId}
                              secretId={secretId}
                              isPlaying={isPlaying}
                            />
                          }
                        />

                        <Route
                          path="/playlist"
                          element={
                            <PlaylistBody
                              setIsPlaying={setIsPlaying}
                              isPlaying={isPlaying}
                              prevUrl={prevUrl}
                              setPrevUrl={setPrevUrl}
                            />
                          }
                        />
                      </Routes>
                    </favoriteContext.Provider>
                  </playerContext.Provider>
                </playTrackFunctionContext.Provider>
              </searchContext.Provider>
            </queueContext.Provider>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
