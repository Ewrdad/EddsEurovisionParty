import React, { useEffect, useState } from "react";
import { getRandomVideo } from "./GetRandomVideo";

export const ShortsPannel = ({ isActive }) => {
  const [currentVideo, setCurrentVideo] = useState(
    "BFYcbGU1EA8?si=AzvDp2ZQgA_usIZi"
  );

  useEffect(() => {
    setCurrentVideo(getRandomVideo());
  }, [isActive]);
  if (!isActive) {
    return null;
  }

  return (
    <iframe
      // width="560"
      // height="315"
      className="w-80 h-130"
      src={`https://youtube.com/embed/${currentVideo}?playlist=${currentVideo}&controls=1&autoplay=1&loop=1`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  );
};
