import { useState } from "react";
import "./App.css";
import LogIn from "./components/login";

function App() {
  const [token, setToken] = useState("");

  const hash = window.location.hash;
  const _token = hash.split("&")[0].split("=")[1];
  window.localStorage.setItem("token", _token);
  setToken(_token);
  return (
    <div className="font-mono">
      <LogIn />
    </div>
  );
}

export default App;
