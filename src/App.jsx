import { useEffect, useState } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PlaylistBody from "./components/playlistBody";

function App() {
  const [token, setToken] = useState("");
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
      <div className="bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)] bg-gra h-screen w-screen flex overflow-x-hidden relative scrollbar scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-transparent">
        {!token ? (
          <LogIn />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Home token={token} clientId={clientId} secretId={secretId} />
                }
              />
              <Route path="/playlist" element={<PlaylistBody />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
