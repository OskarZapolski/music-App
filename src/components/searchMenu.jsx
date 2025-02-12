export default function SearchMenu({
  inputStyle,
  searchInputValue,
  setSearchInputValue,
  searchedTracksArr,
  stylePos,
}) {
  return (
    <div style={stylePos} className="w-full h-[10%] z-10 right-0">
      <div className=" bg-[#000000] h-full flex items-center justify-center flex-col relative">
        <input
          style={inputStyle}
          type="search"
          className="w-1/2  bg-zinc-800 p-2 px-4 search-cancel:appearance-none rounded-3xl text-white text-lg focus:outline-none font-sans"
          placeholder="Search"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <div className="relative w-full  text-white text-lg focus:outline-none ">
          {searchInputValue && (
            <div className="absolute w-1/2 rounded-bl-2xl rounded-br-2xl p-2 bg-zinc-800  left-1/2 transform -translate-x-1/2 ">
              {searchedTracksArr}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
