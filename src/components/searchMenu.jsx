import { useNavigate } from "react-router-dom";

export default function SearchMenu({
  searchInputValue,
  setPlayer,
  stopPlaying,
  setSearchInputValue,
  searchedTracksArr,
  setToken,
  setContainerStyles,
}) {
  const inputStyle = {
    borderBottomLeftRadius: searchInputValue ? "0" : "1.5rem",
    borderBottomRightRadius: searchInputValue ? "0" : "1.5rem",
  };
  const stylePos = {
    position: "fixed",
  };
  const nav = useNavigate();
  return (
    <div style={stylePos} className="w-full h-[10%] z-10 right-0  fixed">
      <div className=" bg-[#000000] h-full flex items-start md:items-center ml-3 md:ml-0 justify-center flex-col relative">
        <input
          style={inputStyle}
          type="search"
          className=" w-3/4 sm:w-3/5 lg:w-1/2  bg-zinc-800 p-2 px-4 sm:search-cancel:appearance-none rounded-3xl text-white text-lg focus:outline-none font-sans"
          placeholder="Search"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <div className="relative w-full  text-white text-lg focus:outline-none ">
          {searchInputValue && (
            <div className="w-3/4 sm:w-3/5 absolute lg:w-1/2 rounded-bl-2xl rounded-br-2xl p-2 bg-zinc-800  left-[37%] sm:left-1/2 transform -translate-x-1/2 ">
              {searchedTracksArr}
            </div>
          )}
        </div>
        <div className="absolute top-6 right-4">
          <button
            className="text-white bg-purple-600 py-2 px-3 rounded-lg"
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              stopPlaying();

              setPlayer();
              setContainerStyles({ height: "full" });
              nav("/music-App/");
            }}
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
}
