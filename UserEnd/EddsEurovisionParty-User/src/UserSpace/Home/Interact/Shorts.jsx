import { Nav } from "./Nav";

export const Shorts = () => {
  return (
    <>
      <iframe
        className="w-full h-130"
        src="https://www.youtube.com/embed/videoseries?si=thItKiB0iVUJuqUj&amp;list=PL8ZlImPAKn2xNo88evB6UKrw-FbgK6W6l"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <Nav page={3} />
    </>
  );
};
