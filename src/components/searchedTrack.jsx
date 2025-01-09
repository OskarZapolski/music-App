export default function SearchedTrack({ artist, name, image }) {
  return (
    <div className="w-full m-auto text-white font-sans h-fit p-3 hover:bg-slate-700 duration-300 cursor-pointer">
      <div className="flex">
        <img src={image} alt="" className="w-14 mr-5" />
        <div>
          <p className="text-lg">{name}</p>
          <p className="text-sm text-gray-200 italic">{artist}</p>
        </div>
      </div>
    </div>
  );
}
