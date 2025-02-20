import { useEffect, useState, createContext } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import PlaylistBody from "./components/playlistBody";
import SearchedTrack from "./components/searchedTrack";

export const playerContext = createContext();
export const playTrackFunctionContext = createContext();
export const searchContext = createContext();
export const queueContext = createContext();

function App() {
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
  const clientId = "aa11595a5869411eacc30f6af0af738d";
  const secretId = "3e867675d0254603a866f88d98ad3820";

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
    window.location.hash = "";
  }, []);
  console.log(player);
  // playerSDKEventsHandler();
  useEffect(() => {
    const tokenSDK =
      "BQA4ZTa1JEqr6PvXeJ8UCRxrMyrxhrX01uVZ6vDkYK4B1gTx2j-6lbTkAab1PwVzVzB2cIdcCFP7rsWT7pn794ZUjQgLry28qWByIkaecgDvg1GwjdzwIG5yPTXuL9ueIhEtIcP7tMcV9-s5ubjDTXuV5gohp48B0dU_DlfEOCQmpqNqebEAp3uau0_17gjLhNJxiCu9ePaLHrP4xLThuKkKSVdtozNEHlE2lHnu1D2uipccu1QZQXwHpsyn";
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
  console.log(queTrackIndex);
  console.log(playlistQueue);
  useEffect(() => {
    if (player && playlistQueue && player.duration - playBackTime < 1000) {
      playTrack(playlistQueue[queTrackIndex + 1].track.uri);
      setPlayer({
        img: playlistQueue[queTrackIndex + 1].track.album.images[2].url,
        name: playlistQueue[queTrackIndex + 1].track.name,
        artist: playlistQueue[queTrackIndex + 1].track.artists[0].name,
        preview_url: playlistQueue[queTrackIndex + 1].track.preview_url,
        duration: playlistQueue[queTrackIndex + 1].track.duration_ms,
      });
      setQueTrackIndex((prev) => (prev += 1));
    }
  }, [playBackTime]);
  console.log(playlistQueue);
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
    console.log(tracksArr);
    if (id < tracksArr.length) {
      const arr = tracksArr.slice(id);

      setPlaylistQueue(arr);
    }
  }

  const containerStyles = {
    height: player ? "88vh" : "full",
  };

  return (
    <div className="font-mono">
      <div
        style={containerStyles}
        className="bg-black bg-gra h-screen w-screen flex overflow-x-hidden relative scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent"
      >
        {!token ? (
          <LogIn />
        ) : (
          <BrowserRouter>
            <queueContext.Provider value={{ setQueueFromCurrentPlaylist }}>
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
                  value={[playTrack, stopPlaying, resumePlaying]}
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
