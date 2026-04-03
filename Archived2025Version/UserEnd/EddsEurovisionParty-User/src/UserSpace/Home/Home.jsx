import { Grid } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Weather } from "./Weather";
import { NextEvent } from "./NextEvent";
import { Interact } from "./Interact/Interact";
import usePWAInstallPrompt from "@/Install";
import { Participants } from "./Buttons/Participants";
import { welcomeMessage } from "./WelcomeMessage"; // Import the extracted function
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useEffect, useState } from "react"; // Added useEffect and useState
import heartIcon from "@/assets/heart.svg"; // Import the heart SVG

export const Home = ({ user, invalidateUser }) => {
  const navigator = useNavigate();
  const { canInstall, promptToInstall } = usePWAInstallPrompt();
  const { width, height } = useWindowSize();
  const [heartImage, setHeartImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = heartIcon;
    img.onload = () => setHeartImage(img);
  }, []);

  // Draws the heart image. Assumes heart.svg can be colored by the Confetti component's 'colors' prop.
  const drawHeartShape = (ctx) => {
    if (heartImage) {
      const heartSize = 40; // Size of the heart
      ctx.drawImage(
        heartImage,
        -heartSize / 2,
        -heartSize / 2,
        heartSize,
        heartSize
      );
    }
  };

  // Draws a small, randomly sized rectangle for glitter effect.
  const drawGlitterShape = (ctx) => {
    const confettoSize = Math.random() * 8 + 4; // Random size between 4 and 12 for glitter
    ctx.beginPath();
    ctx.rect(-confettoSize / 2, -confettoSize / 2, confettoSize, confettoSize);
    ctx.fill(); // The color is applied by react-confetti from its 'colors' prop
  };

  // Sparkly/glittery colors for the glitter confetti
  const glitterColors = [
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#ffff00", // Yellow
    "#ff0000", // Red
    "#00ff00", // Lime
    "#0000ff", // Blue
    "#ffA500", // Orange
    "#800080", // Purple
    "#ffc0cb", // Pink
    "#add8e6", // Light Blue
    "#f0e68c", // Khaki (gold-like)
    "#d3d3d3", // Light Grey (silver-like)
  ];

  return (
    <>
      {/* Confetti for Hearts (solid color) */}
      {heartImage && (
        <Confetti
          key="hearts-confetti"
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={100} // Number of heart particles
          gravity={0.02}
          wind={0.005}
          colors={["#FF0000"]} // Solid red for hearts. Change if heart.svg has its own color or you want a different solid color.
          drawShape={drawHeartShape}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      )}
      {/* Confetti for Glitter (sparkly rectangles) */}
      <Confetti
        key="glitter-confetti"
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={60} // Number of glitter particles
        gravity={0.025} // Slightly different gravity for variation
        wind={0.008} // Slightly different wind for variation
        colors={glitterColors} // Use the sparkly color palette
        drawShape={drawGlitterShape}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <Grid
        container
        className="justify-center text-center touch-pan-y text-white pb-8" // Added text-white and padding-bottom
        style={{ position: "relative", zIndex: 1 }} // Ensure content is above confetti
      >
        <Grid item xs={11} className="pt-10">
          <Weather />{" "}
          {/* Assuming Weather component is styled or will be styled separately */}
          <h1 className="text-6xl md:text-7xl font-bold text-shadow-lg max-w-screen mt-4">
            {welcomeMessage()}
          </h1>
          <h3 className="text-3xl md:text-4xl text-shadow-md text-white/90 mt-2">
            {user.name || "you"}
          </h3>
        </Grid>
        <Grid item xs={11} className="my-6 md:my-8">
          {/* Updated Separator to be more subtle with the new theme */}
          <Separator orientation="horizontal" className="bg-white/20" />
        </Grid>

        {/* Main actions section - consider flex layout for better responsiveness */}
        <Grid item xs={11} md={10} lg={8} className="space-y-5">
          <Participants />{" "}
          {/* Assuming this component is styled or will be styled separately */}
          <Button
            variant="outlined"
            onClick={() => {
              navigator("/user/food");
            }}
            // Unified Primary Button Style
            className="w-full p-5 md:p-6 rounded-xl text-2xl md:text-3xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-150 ease-in-out"
          >
            Food
          </Button>
          <NextEvent />{" "}
          {/* Assuming this component is styled or will be styled separately */}
          <Button
            variant="outlined"
            onClick={() => {
              navigator("/user/past-winners");
            }}
            // Unified Primary Button Style
            className="w-full p-5 md:p-6 rounded-xl text-2xl md:text-3xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-150 ease-in-out"
          >
            Past Winners
          </Button>
        </Grid>

        {/* Secondary actions section */}
        <Grid item xs={11} md={10} lg={8} className="mt-8 space-y-4">
          <a
            href="https://esc.vote/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outlined"
              // Unified Secondary/Utility Button Style
              className="w-full p-4 md:p-5 rounded-lg text-xl md:text-2xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
            >
              Vote (Official)
            </Button>
          </a>
          <a
            href="https://forms.gle/NfzH9AQ8Sic1iotr7"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outlined"
              // Unified Secondary/Utility Button Style
              className="w-full p-4 md:p-5 rounded-lg text-xl md:text-2xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
            >
              Provide Feedback
            </Button>
          </a>
          <Button
            variant="outlined"
            // Unified Secondary/Utility Button Style
            className="w-full p-4 md:p-5 rounded-lg text-xl md:text-2xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
            onClick={() => {
              navigator("/user/dashboard");
            }}
          >
            Dashboard
          </Button>
        </Grid>

        <Grid item xs={11} md={10} lg={8} className="mt-8">
          <Interact />{" "}
          {/* Assuming this component is styled or will be styled separately */}
        </Grid>

        {/* Install and App Info Buttons */}
        <Grid item xs={11} md={10} lg={8} className="mt-6 space-y-4">
          {canInstall && (
            <Button
              variant="outlined"
              // Unified Secondary/Utility Button Style
              className="w-full p-4 md:p-5 rounded-lg text-xl md:text-2xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
              onClick={() => {
                promptToInstall();
              }}
            >
              Install App
            </Button>
          )}
          <a
            href="https://eurovision.page.link/app"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outlined"
              // Unified Secondary/Utility Button Style
              className="w-full p-4 md:p-5 rounded-lg text-xl md:text-2xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
            >
              Open App Info
            </Button>
          </a>
        </Grid>

        {/* Miscellaneous Buttons - Corrected Styles */}
        <Grid item xs={11} md={10} lg={8} className="mt-6 space-y-4">
          <a
            href="https://youtu.be/1af8llc2OBI?si=IjtghkwJgcJtFiWI"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outlined"
              // Unified Secondary/Utility Button Style - adjusted font for this specific button
              className="w-full p-4 md:p-5 rounded-lg text-lg md:text-xl font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-150 ease-in-out"
            >
              Recap Last Year's Drama
            </Button>
          </a>
          <Button
            variant="outlined"
            // Danger Button Style - adjusted font and padding to match Recap
            className="w-full p-4 md:p-5 rounded-lg text-lg md:text-xl font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-150 ease-in-out"
            onClick={() => {
              invalidateUser();
            }}
          >
            Logout
          </Button>
        </Grid>

        <Grid
          item
          xs={11}
          md={10}
          lg={8}
          className="text-white/70 text-sm mt-8"
        >
          <p>Session Code: {user.session}</p>
        </Grid>
      </Grid>
    </>
  );
};
