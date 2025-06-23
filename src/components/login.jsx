export default function LogIn() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=aa11595a5869411eacc30f6af0af738d&response_type=token&redirect_uri=https://oskarzapolski.github.io/music-App/&scope=streaming%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-private%20user-read-currently-playing";
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-black text-white ">
      <div className="z-10 w-[23%] relative isolate">
        <div className="absolute rounded-full bg-yellow-700 mix-blend-multiply blur-xl  size-44 2xl:size-72 -top-6 animate-pulse-subtle z-10 animate-blob absolute -left-[3.5%]"></div>
        <div className="absolute rounded-full bg-purple-700 mix-blend-multiply blur-xl  -right-[3.5%] size-44 2xl:size-72 -top-6 animate-pulse-subtle z-10 animate-blob3 absolute "></div>
        <div className="absolute rounded-full bg-pink-700 mix-blend-multiply blur-xl top-12 size-44 2xl:size-72 left-[5%] 2xl:left-[14.5%]  animate-pulse-subtle z-10 animate-blob6 absolute "></div>
      </div>
      <div className="absolute right-5 top-5 w-10 h-1 shadow-xl shadow-white rotate-45 z-20"></div>
      <div className="grid grid-cols-1 gap-10 items-center place-items-center z-20">
        <h1 className="text-white text-3xl">
          <span>
            <span className="animate-fadein opacity-0">This is a </span>
            <span className="animate-fadein4 opacity-0">personal project </span>
            <span className="animate-fadein6 opacity-0">
              using the Spotify{" "}
            </span>
            <span className="animate-fadein8 opacity-0"> API. Not </span>
            <span className="animate-fadein10 opacity-0">
              affiliated with Spotify{" "}
            </span>
          </span>
        </h1>
        <a href={AUTH_URL}>
          <button className="sm:p-4 p-3 bg-purple-500 rounded-3xl cursor-pointer  text-xl active:translate-y-1 hover:bg-purple-800 transition duration-150 animate-fadein12 opacity-0">
            Log through spotify premium account
          </button>
        </a>
      </div>
    </div>
  );
}
