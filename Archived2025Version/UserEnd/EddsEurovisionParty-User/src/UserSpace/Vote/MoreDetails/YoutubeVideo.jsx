export const YoutubeVideo = ({ detail }) => {
  return (
    <div>
      <h3 className="text-xl">{detail.title}</h3>
      <iframe
        src={detail.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};
