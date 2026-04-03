import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button component is available

// Mock data for past Eurovision winners
const pastEurovisionWinners = [
  { year: 2024, country: "Switzerland", artist: "Nemo", song: "The Code" },
  { year: 2023, country: "Sweden", artist: "Loreen", song: "Tattoo" },
  {
    year: 2022,
    country: "Ukraine",
    artist: "Kalush Orchestra",
    song: "Stefania",
  },
  { year: 2021, country: "Italy", artist: "Måneskin", song: "Zitti e buoni" },
  {
    year: 2019,
    country: "Netherlands",
    artist: "Duncan Laurence",
    song: "Arcade",
  },
  { year: 2018, country: "Israel", artist: "Netta", song: "Toy" },
  {
    year: 2017,
    country: "Portugal",
    artist: "Salvador Sobral",
    song: "Amar pelos dois",
  },
  { year: 2016, country: "Ukraine", artist: "Jamala", song: "1944" },
  { year: 2015, country: "Sweden", artist: "Måns Zelmerlöw", song: "Heroes" },
  {
    year: 2014,
    country: "Austria",
    artist: "Conchita Wurst",
    song: "Rise Like a Phoenix",
  },
];

export const PastWinners = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 min-h-screen text-white">
      <Button
        onClick={() => navigate(-1)} // Or navigate('/user/home')
        variant="outline"
        className="mb-6 bg-white/20 hover:bg-white/30 text-white border-white/50 hover:border-white py-2 px-4 rounded-lg flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <span>Back to Home</span>
      </Button>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-shadow-lg">
        Past Eurovision Winners
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {pastEurovisionWinners.map((winner) => (
          <div
            key={winner.year}
            className="flex flex-col bg-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-white/20"
          >
            <div className="p-4 bg-black/20">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400 text-center">
                {winner.year}
              </h2>
            </div>
            <div className="p-4 md:p-5 space-y-3 flex-grow">
              <div className="flex items-start">
                <span className="font-semibold text-sky-300 w-1/3 text-sm md:text-base shrink-0">
                  Country:
                </span>
                <span className="text-sm md:text-base text-white/90 w-2/3">
                  {winner.country}
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-sky-300 w-1/3 text-sm md:text-base shrink-0">
                  Artist:
                </span>
                <span className="text-sm md:text-base text-white/90 w-2/3">
                  {winner.artist}
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-sky-300 w-1/3 text-sm md:text-base shrink-0">
                  Song:
                </span>
                <span className="text-sm md:text-base text-white/90 w-2/3">
                  "{winner.song}"
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
