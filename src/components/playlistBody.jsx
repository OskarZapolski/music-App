import { useEffect } from "react";

export default function PlaylistBody({ id, name, images, tracksUrl }) {
  const accessToken = localStorage.getItem("token");
  useEffect(() => {
    function fetchTracks() {
      fetch(tracksUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
    fetchTracks();
    return fetchTracks;
  }, []);
  return <div className="text-2xl text-white"></div>;
}
