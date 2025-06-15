export default function LogIn() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=aa11595a5869411eacc30f6af0af738d&response_type=token&redirect_uri=https://oskarzapolski.github.io/music-App/&scope=streaming%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-private%20user-read-currently-playing";
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="grid grid-cols-1 gap-10 items-center place-items-center">
        <h1 className="text-white text-3xl">
          This is a personal project using the Spotify API. Not affiliated with
          Spotify
        </h1>
        <a href={AUTH_URL}>
          <button className="sm:p-4 p-3 bg-purple-600 rounded-3xl cursor-pointer  text-xl active:translate-y-1 hover:bg-purple-800 transition duration-150">
            Log through spotify premium account
          </button>
        </a>
      </div>
    </div>
  );
}
