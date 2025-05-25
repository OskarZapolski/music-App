export default function getPlaylist(token, category) {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const ps = category.map((category) => {
    return fetch(
      `https://api.spotify.com/v1/search?q=${category}&type=playlist&market=US`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error(res.status);
        }
      })
      .then((data) => {
        return [category, ...data.playlists.items];
      });
  });

  return ps;
}
