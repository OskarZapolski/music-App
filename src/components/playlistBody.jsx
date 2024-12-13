import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import PlayMusicIcon from "../icons/playMusic-icon";
import Player from "./player";
import LoadingIcon from "./loadingIcon";
import { playerContext } from "../App";

export default function PlaylistBody() {
  const [tracksArr, setTracksArr] = useState();
  const [tracksToDisplay, setTracksToDisplay] = useState();
  const [player, setPlayer] = useContext(playerContext);

  const accessToken = localStorage.getItem("token");

  const { id, name, images, tracksUrl } = useLocation().state;
  useEffect(() => {
    function fetchTracks() {
      fetch(tracksUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTracksArr(data.items));
    }
    fetchTracks();
    return fetchTracks;
  }, []);

  //zainstaluj webkit scrollbar do stylow scroll
  useEffect(() => {
    function displayTrackData() {
      if (tracksArr) {
        setTracksToDisplay(
          tracksArr.map((track) => {
            console.log(track);
            return (
              <div className="group grid grid-cols-8 py-3 px-3 hover:bg-[#51515169] items-center duration-200 rounded-lg">
                <div className=" flex items-center text-base  w-full max-w-md text-ellipsis truncate col-span-3 relative">
                  <img
                    src={track.track.album.images[2].url}
                    alt=""
                    className="relative rounded-md w-[12%] mr-5 group-hover:-z-2"
                  />
                  <PlayMusicIcon setPlayer={setPlayer} track={track} />
                  <p className="text-base   max-w-md text-ellipsis truncate">
                    <p>{track.track.name}</p>
                    <p className="text-[12px] text-gray-400">
                      {track.track.artists[0].name}
                    </p>
                  </p>
                </div>
                <div className="text-base col-span-2 text-ellipsis truncate">
                  {track.track.album.name}
                </div>
                <div className="col-span-2 text-ellipsis truncate">
                  <p className="text-base ">{track.added_at.substr(0, 10)}</p>
                </div>
                <div>
                  <p className="text-base  text-start ">0:30</p>
                </div>
              </div>
            );
          })
        );
      }
    }
    displayTrackData();
  }, [tracksArr]);
  return (
    <>
      <Navbar />
      {player && (
        <Player
          img={player.img}
          name={player.name}
          artist={player.artist}
          preview_url={player.preview_url}
        />
      )}
      {tracksToDisplay ? (
        <div className="w-11/12 h-100 text-white mt-10 absolute right-0 pb-16 pl-10 bg-[#2C2E3A] bg-gradient-to-r from-[rgba(0,0,0,0.7087885154061625)] from-50% to-[rgba(14,2,28,0.9529061624649859)]">
          <div className="text-2xl text-white font-sans w-[95%]">
            <div className="flex items-center">
              <img src={images[0].url} alt="" className="w-1/6 pb-10" />
              <h1 className="ml-10 text-6xl font-bold text-ellipsis truncate">
                {name}
              </h1>
            </div>
            {/* <table className=" border-separate border-spacing-y-5 border-transparent w-full pr-10">
            <tr>
              <th className="text-left">title</th>

              <th className="text-left">album</th>
              <th>added at</th>
              <th>duration</th>
            </tr>
            {tracksToDisplay}
          </table> */}
            <div className="grid grid-cols-8 gap-y-4 px-3">
              <h2 className="col-span-3 ">title</h2>
              <h2 className="col-span-2">album</h2>
              <h2 className="col-span-2">added at</h2>
              <h2 className="text-start">duration</h2>
              <hr className="col-span-8 mb-5" />
            </div>
            {tracksToDisplay}
          </div>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "./navbar";
// import PlayMusicIcon from "../icons/playMusic-icon";
// import Player from "./player";
// import LoadingIcon from "./loadingIcon";

// export default function PlaylistBody() {
//   const [tracksArr, setTracksArr] = useState();
//   const [tracksToDisplay, setTracksToDisplay] = useState();
//   const [player, setPlayer] = useState();
//   const accessToken = localStorage.getItem("token");

//   const { id, name, images, tracksUrl } = useLocation().state;
//   useEffect(() => {
//     function fetchTracks() {
//       fetch(tracksUrl, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setTracksArr(data.items));
//     }
//     fetchTracks();
//     return fetchTracks;
//   }, []);

//   //zainstaluj webkit scrollbar do stylow scroll
//   useEffect(() => {
//     function displayTrackData() {
//       if (tracksArr) {
//         setTracksToDisplay(
//           tracksArr.map((track) => {
//             return (
//               <div className="group grid grid-cols-8 py-3 px-3 hover:bg-[#51515169] items-center duration-200 rounded-lg">
//                 <div
//                   className=" flex items-center text-base  w-full max-w-md text-ellipsis truncate col-span-3 relative"
//                   onClick={() =>
//                     setPlayer({
//                       img: track.track.album.images[2].url,
//                       name: track.track.name,
//                       artist: track.track.artists[0].name,
//                       preview_url: track.track.preview_url,
//                     })
//                   }
//                 >
//                   <img
//                     src={track.track.album.images[2].url}
//                     alt=""
//                     className="relative rounded-md w-[12%] mr-5 group-hover:-z-2"
//                   />
//                   <PlayMusicIcon />
//                   <p className="text-base   max-w-md text-ellipsis truncate">
//                     <p>{track.track.name}</p>
//                     <p className="text-[12px] text-gray-400">
//                       {track.track.artists[0].name}
//                     </p>
//                   </p>
//                 </div>
//                 <div className="text-base col-span-2 text-ellipsis truncate">
//                   {track.track.album.name}
//                 </div>
//                 <div className="col-span-2 text-ellipsis truncate">
//                   <p className="text-base ">{track.added_at.substr(0, 10)}</p>
//                 </div>
//                 <div>
//                   <p className="text-base  text-start ">0:30</p>
//                 </div>
//               </div>
//             );
//           })
//         );
//       }
//     }
//     displayTrackData();
//   }, [tracksArr]);
//   return (
//     <>
//       <Navbar />
//       {player && (
//         <Player
//           img={player.img}
//           name={player.name}
//           artist={player.artist}
//           preview_url={player.preview_url}
//         />
//       )}
//       {tracksToDisplay ? (
//         <div className="w-11/12 h-100 text-white mt-10 absolute right-0 pb-16 pl-10 ">
//           <div className="text-2xl text-white font-sans w-[95%]">
//             <div className="flex items-center">
//               <img src={images[0].url} alt="" className="w-1/6 pb-10" />
//               <h1 className="ml-10 text-6xl font-bold">{name}</h1>
//             </div>
//             {/* <table className=" border-separate border-spacing-y-5 border-transparent w-full pr-10">
//             <tr>
//               <th className="text-left">title</th>

//               <th className="text-left">album</th>
//               <th>added at</th>
//               <th>duration</th>
//             </tr>
//             {tracksToDisplay}
//           </table> */}
//             <div className="grid grid-cols-8 gap-y-4 px-3">
//               <h2 className="col-span-3 ">title</h2>
//               <h2 className="col-span-2">album</h2>
//               <h2 className="col-span-2">added at</h2>
//               <h2 className="text-start">duration</h2>
//               <hr className="col-span-8 mb-5" />
//             </div>
//             {tracksToDisplay}
//           </div>
//         </div>
//       ) : (
//         <LoadingIcon />
//       )}
//     </>
//   );
// }
