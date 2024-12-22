import { useEffect, useState, createContext } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  // playerSDKEventsHandler();
  useEffect(() => {
    const tokenSDK =
      "BQDqGKeovwmu2XkJkiOqtaQr7tcWQ_tfMIwaup14L3Ki29vR4yUxoJzjakxgSC1vbQwY8TbWBLMKLIGWqHSwKEbhOM63s1Of4srpZlswALpODKMWKgtKnUxsucY21-AdfPFiQA4a2wBOFGw6sDrrfHVMQUIsUdG5XdVk3Bx9acWFrI_-h3zjN4xakLaW4eBB58Jp9v7WV8EG-oALAKEMGxGC7ajRpQRuKBUz";
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
      PLAYER.addListener("player_state_changed", (state) => {
        console.log(state);
      });
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
    const apiUrl = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
    const requestBody = {
      uris: [trackUri],
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

  console.log(playerSDK);

  console.log(isConnected);
  return (
    <div className="font-mono">
      <div className="bg-black bg-gra h-screen w-screen flex overflow-x-hidden relative scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent">
        {!token ? (
          <LogIn />
        ) : (
          <BrowserRouter>
            <palyTrackFunctionContext.Provider value={playTrack}>
              <playerContext.Provider value={[player, setPlayer]}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        token={token}
                        clientId={clientId}
                        secretId={secretId}
                      />
                    }
                  />

                  <Route path="/playlist" element={<PlaylistBody />} />
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
