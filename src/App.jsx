import { useEffect, useState } from "react";
import "./App.css";
import LogIn from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    if (!token) {
      const _token = hash.split("&")[0].split("=")[1];
      setToken(_token);
      window.localStorage.setItem("token", _token);
    } else {
      setToken(token);
    }

    window.location.hash = "";
  }, []);

  return (
    <div className="font-mono">
      {!token ? (
        <LogIn />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
