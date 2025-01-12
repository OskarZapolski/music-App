import { useEffect, useState, createContext } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import PlaylistBody from "./components/playlistBody";

export const playerContext = createContext();
export const palyTrackFunctionContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [player, setPlayer] = useState();
  const [playerSDK, setPlayerSDK] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceId, setDeviceId] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [prevUrl, setPrevUrl] = useState("/");
  const clientId = "aa11595a5869411eacc30f6af0af738d";
  const secretId = "3e867675d0254603a866f88d98ad3820";
  console.log(prevUrl);

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

  // playerSDKEventsHandler();
  useEffect(() => {
    const tokenSDK =
      "BQDu36KWYOossqowXVUywTfx1-ZMWSV2Kfw7WM88WLl0X6ZuFCSpE_pNK9gu8TawUvMTe4vf8x0eHM5ceLz6qaPcRwOsI2WYIMcTC3g9qkqpXJKau7qkqNSdoYFJ7vMxD4keuF33neAqSMKqte1pA1AIiqJ8HTV7MkHxBRPRQqNKUcHRFt5lVyK8GvSlDOu6iHV_EUOlMRvdbuw2jNz2EaHzHwx0r4J_EtAl";
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
        volume: 1,
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
    };
  }, [window.Spotify]);

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

  const containerStyles = {
    height: player ? "88vh" : "full",
  };

  console.log(isPlaying);
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
            <palyTrackFunctionContext.Provider
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
            </palyTrackFunctionContext.Provider>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
