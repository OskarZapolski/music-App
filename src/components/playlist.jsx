export default function Playlist({ id, externalURL, name, images }) {
  return (
    <div key={id}>
      <a href={externalURL} target="_blank" rel="noopener noreferrer">
        <img src={images[0]?.url} alt={name} />
        <p>{name}</p>
      </a>
    </div>
  );
}
