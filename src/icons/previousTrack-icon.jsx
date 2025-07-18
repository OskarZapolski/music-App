import React from "react";

export default function PreviousTrackIcon({ playPreviousTrack, setIsPlaying }) {
  return (
    <svg
      fill="#000000"
      height="30px"
      width="25px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51.532 51.532"
      className="fill-slate-100 hover:scale-110 duration-150"
      onClick={() => {
        playPreviousTrack();
        setIsPlaying(true);
      }}
    >
      <g>
        <path
          d="M6.631,1.963c3.662,0,6.631,2.969,6.631,6.631V23.81c0.284-0.324,0.616-0.609,1-0.831l31.27-18.053
		c1.238-0.715,2.762-0.715,4,0c1.236,0.714,2,2.035,2,3.464v36.105c0,1.429-0.764,2.75-2,3.463c-0.619,0.357-1.311,0.537-2,0.537
		c-0.69,0-1.381-0.18-2-0.537l-31.27-18.053c-0.384-0.221-0.716-0.506-1-0.83v13.863c0,3.662-2.969,6.631-6.631,6.631
		S0,46.6,0,42.938V8.594C0,4.932,2.969,1.963,6.631,1.963z"
        />
      </g>
    </svg>
  );
}
