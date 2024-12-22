export default function LogIn() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=aa11595a5869411eacc30f6af0af738d&response_type=token&redirect_uri=http://localhost:5173/&scope=streaming&20%user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing";
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="grid grid-cols-1 gap-10 items-center place-items-center">
        <img src="spoti-240.png" alt="" />
        <a href={AUTH_URL}>
          <button className="p-4 bg-green-600 rounded-3xl cursor-pointer text-lg active:translate-y-1 hover:bg-green-800 transition duration-150">
            Log through spotify
          </button>
        </a>
      </div>
    </div>
  );
}
