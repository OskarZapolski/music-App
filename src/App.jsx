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
import Favorites from "./components/favorites";
import Player from "./components/player";

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
  const [containerStyles, setContainerStyles] = useState();
  const clientId = "aa11595a5869411eacc30f6af0af738d";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode) {
      setCode(authCode);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      if (_token) {
        setToken(_token);
        localStorage.setItem("expirationTime", Date.now() + 3500000);
        localStorage.setItem("token", _token);
        window.history.replaceState(
          null,
          "",
          window.location.href.split("#")[0]
        );
      }
    }
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", window.location.href.split("#")[0]);
  }, [token]);
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (Date.now() > parseInt(expirationTime)) {
      stopPlaying();
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      setToken("");
      setPlayer();
      setContainerStyles({ height: "full" });
    }
  }, []);

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

  function addToFavorite(track, heartColor, setHeartColor) {
    const trackIds = track.track.id;
    fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data[0] == false) {
          fetch("https://api.spotify.com/v1/me/tracks", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ids: [trackIds],
            }),
          }).then((res) => {
            setHeartColor(true);
            setFavoriteTracks((prev) => [track, ...prev]);
          });
        } else {
          fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackIds}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then((resp) => {
            setFavoriteTracks((prev) =>
              prev.filter((track) => track.track.id != trackIds)
            );
            setHeartColor(false);
          });
        }
      })
      .catch((err) => console.error(err));
  }

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
  async function initializePLayer(tokenSDK) {
    const PLAYER = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(tokenSDK);
      },
      volume: 0.3,
    });

    PLAYER.addListener("not_ready", ({ device_id }) => {
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

    PLAYER.addListener("playback_error", ({ message }) => {
      console.error("Playback error:", message);
    });
    PLAYER.addListener("authentication_error", ({ message }) => {
      console.error("Authentication error:", message);
    });

    await PLAYER.connect();
    setPlayerSDK(PLAYER);
  }
  useEffect(() => {
    const tokenSDK = token;

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

    initializePLayer(tokenSDK);

    return () => {
      if (playerSDK) {
        playerSDK.disconnect();
      }
    }; //153600
  }, [window.Spotify, token]);

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
    if (!token || !playerSDK) return;
    const intervalId = setInterval(() => {
      stopPlaying();
      alert("your token has expired you have to log in again");
      localStorage.removeItem("token");
      setToken("");

      setPlayer();
      setContainerStyles({ height: "full" });
    }, 3500000);
    return () => clearInterval(intervalId);
  }, [token, playerSDK]);

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
      const arr = searchedTracks.map((track, i) => {
        return (
          <SearchedTrack
            key={i}
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

  function setQueueFromCurrentPlaylist(id, tracksArr) {
    if (id < tracksArr.length) {
      const arr = tracksArr.slice(id);

      setPlaylistQueue(arr);
      setQueTrackIndex(0);
    }
  }

  useEffect(() => {
    setContainerStyles({
      height: player ? (showPhoneTrackSection ? "100vh" : "88vh") : "100vh",
    });
  }, [player, token, showPhoneTrackSection]);

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
                  setToken,
                  setContainerStyles,
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
                      value={{
                        setFavoriteTracks,
                        favoriteTracks,
                        addToFavorite,
                      }}
                    >
                      <Routes>
                        <Route
                          exact
                          path="/music-App/"
                          element={
                            <Home
                              token={token}
                              clientId={clientId}
                              isPlaying={isPlaying}
                            />
                          }
                        />

                        <Route
                          exact
                          path="/music-App/playlist"
                          element={
                            <PlaylistBody
                              setIsPlaying={setIsPlaying}
                              isPlaying={isPlaying}
                              prevUrl={prevUrl}
                              setPrevUrl={setPrevUrl}
                            />
                          }
                        />
                        <Route
                          exact
                          path="/music-App/favorites"
                          element={<Favorites token={token} />}
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
