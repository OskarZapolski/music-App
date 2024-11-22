export default function Player({ img, name, artist, preview_url }) {
  return (
    <div className="fixed bottom-0 h-20 w-full bg-zinc-900 right-0 z-10 text-white font-sans">
      <div className="mx-4 flex items-center">
        <img src={img} alt="" />
        {name}
      </div>
    </div>
  );
}
