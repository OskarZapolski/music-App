import { useEffect, useState, createContext } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PlaylistBody from "./components/playlistBody";

export const playerContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [player, setPlayer] = useState();
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

  return (
    <div className="font-mono">
      <div className="bg-black bg-gra h-screen w-screen flex overflow-x-hidden relative scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent">
        {!token ? (
          <LogIn />
        ) : (
          <BrowserRouter>
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
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
