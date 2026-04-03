import { useState } from "react";
import { Nav } from "./Nav";
import { Button } from "@/components/ui/button";

export const Odds = () => {
  const [revealed, setRevealed] = useState(false);
  return (
    <>
      <Nav page={5} />
      <div>
        {!revealed && (
          <Button
            className="bg-gradient-to-r from-amber-400/30 via-amber-600/50 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl h-20 backdrop-blur-3xl focus:ring-8"
            onClick={() => setRevealed(true)}
          >
            Want to reveal the odds/favourites? May contain spoilers!
          </Button>
        )}
        {revealed && <Content />}
      </div>

      <Nav page={5} />
    </>
  );
};

const Content = () => {
  return (
    <>
      {" "}
      <a href="https://eurovisionworld.com/odds/eurovision">
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl  focus:ring-8">
          {" "}
          Betting odds{" "}
        </Button>
      </a>
      <a href="https://esctracker.com/">
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl  focus:ring-8">
          Trending Charts
        </Button>
      </a>
      <div className="bg-white/70 text-shadow-lg backdrop-blur-3xl rounded-4xl m-2">
        <h3 className="text-2xl font-bold"> Favourites to win:</h3>
        <p className="text-xl">1 - Baru badu bastu - Kaj - Sweden</p>
        <p className="text-xl">2 - Wasted Love - JJ - Austria</p>
        <p className="text-xl">3 - Maman - Louane - France</p>
      </div>
      <a href="https://www.gambleaware.org/">
        If you are gambling, please do it responsibly.
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl  focus:ring-8">
          {" "}
          Gamble Aware
        </Button>
      </a>
      <a href="https://www.nhs.uk/live-well/addiction-support/gambling-addiction/">
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl  focus:ring-8">
          {" "}
          NHS Gambling Help
        </Button>
      </a>
    </>
  );
};
