export default function PauseTrackIcon({ setIsPlaying, stopPlaying }) {
  return (
    <svg
      fill="#000000"
      height="40px"
      width="40px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39.989 39.989"
      className="fill-slate-100 hover:scale-110 duration-150"
      onClick={() => {
        setIsPlaying(false);

        stopPlaying();
      }}
    >
      <path
        id="XMLID_148_"
        d="M19.995,0C8.952,0,0,8.952,0,19.994c0,11.043,8.952,19.995,19.995,19.995s19.995-8.952,19.995-19.995
	C39.989,8.952,31.037,0,19.995,0z M18.328,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5
	s1.5,0.671,1.5,1.5V26.057z M24.661,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5
	s1.5,0.671,1.5,1.5V26.057z"
      />
    </svg>
  );
}
