import React, { useEffect, useState, useRef } from "react";
import { getRandomVideo } from "./GetRandomVideo";
import { useCarousel } from "@/components/ui/carousel";
export const ShortsPannel = ({ isActive }) => {
  const playerRef = useRef(null);
  const { scrollPrev, scrollNext } = useCarousel();

  useEffect(() => {
    /**
     * @type {YT.Player | null}
     * @description The YouTube player instance. Initialized to null.
     */
    let player = null;

    /**
     * Initializes the YouTube player when the API is ready.
     */
    const onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        player = new YT.Player(playerRef.current, {
          width: "1000",
          height: "1000",
          videoId: getRandomVideo(),
          playerVars: {
            playsinline: 1,
            controls: 0,
          },
          events: {
            // prettier-ignore
            'onReady': onPlayerReady,
            // prettier-ignore
            'onStateChange': onPlayerStateChange,
          },
        });
      }
    };

    function onPlayerReady(event) {
      if (isActive) event.target.playVideo();
    }

    /**
     * Handles changes in the player's state. Calls the onVideoEnd callback when the video finishes.
     * @param {YT.OnStateChangeEvent} event - The event object containing the player's state.
     */
    const onPlayerStateChange = (event) => {
      // YT.PlayerState.ENDED is 0
      console.log(event);
      if (event.data === YT.PlayerState.ENDED) {
        if (typeof scrollPrev === "function") {
          scrollPrev();
          //scroll prev again after 2 seconds
          setTimeout(() => {
            if (typeof scrollPrev === "function") {
              scrollNext();
            }
          }, 10000);
        }
      }
    };

    // Check if the YouTube API script is already loaded
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // Load the YouTube IFrame Player API asynchronously
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = () => {
        onYouTubeIframeAPIReady();
      };
      document.body.appendChild(tag);
    }

    // Cleanup function to destroy the player instance and remove the script when the component unmounts
    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
      delete window.onYouTubeIframeAPIReady;
      const scriptTag = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [isActive, scrollPrev]);

  return <div ref={playerRef} className="w-full h-125 m-2 rounded-lg" />;
};
