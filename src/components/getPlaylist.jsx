export default function getPlaylist(token, category) {
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const ps = category.map((category) => {
    return fetch(
      `https://api.spotify.com/v1/browse/categories/${category}/playlists?limit=4`,
      fetchOptions
    )
      .then((res) => res.json())
      .then((data) => data.playlists.items);
  });

  return ps;
}
