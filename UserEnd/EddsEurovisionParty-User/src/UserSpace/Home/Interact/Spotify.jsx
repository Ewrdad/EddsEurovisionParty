import { Nav } from "./Nav";

export const Spotify = () => {
  return (
    <div className="h-130 overflow-y-scroll w-full">
      <iframe
        src="https://open.spotify.com/embed/playlist/3jYAaE2JloW8u2C96HdtKR?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <p className="text-md">
        For best experience open playlist in spotify player
      </p>
      <Nav page={1} />
    </div>
  );
};
