/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";

export const CountryCard = ({ country }) => {
  const [votes, setVotes] = useState(0);
  const timerId = useRef(null);

  /**
   * @function handleVoteChange
   * @description Handles vote changes and sets a timer for fetching.
   */
  const handleVoteChange = () => {
    // Clear the previous timer if it exists
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    // Set a new timer
    timerId.current = setTimeout(() => {
      console.log("Fetch", votes); // Replace with your fetch logic
      timerId.current = null; // Reset the timer ID
    }, 1000); // 5-second delay
  };

  /**
   * @function useEffect
   * @description Clears the timer when the component unmounts to prevent memory leaks.
   */
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    handleVoteChange(votes);
  }, [country.name, handleVoteChange, votes]);

  return (
    <Grid size={11} className="p-2 object-cover">
      <Grid container className="justify-center text-center">
        <Grid size={4} className="content-center">
          <img
            src={country.flagUrl}
            alt={country.name}
            className=" h-full w-48 overflow-clip justify-center bg-amber-500 object-cover self-center"
          />
        </Grid>
        <Grid size={8} className="content-center">
          <Grid container className="justify-center text-center h-full">
            <Grid size={12} className="content-center">
              <h1 className="text-2xl">{country.song}</h1>
              <h1 className="text-xl">{country.artist}</h1>
            </Grid>
            <Grid size={4} className="content-center">
              <Button
                className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 mt-2 h-3/4 w-full"
                onClick={() => {
                  setVotes((prevValue) => {
                    if (typeof prevValue !== "number") {
                      return 0;
                    }
                    return prevValue - 1;
                  });
                }}
              >
                DOWN{" "}
              </Button>
            </Grid>
            <Grid size={4} className="content-center">
              <Input
                value={votes}
                className="h-3/4 w-full"
                type="number"
                onChange={(event) => {
                  if (typeof event.target.value !== "number") {
                    setVotes(0);
                  }
                  setVotes(event.target.value);
                }}
              />
            </Grid>
            <Grid size={4} className="content-center">
              <Button
                className={
                  "bg-amber-600 hover:bg-amber-800 text-black text-xl p-4  mt-2 h-3/4 w-full"
                }
                onClick={() => {
                  setVotes((prevValue) => {
                    if (typeof prevValue !== "number") {
                      return 0;
                    }
                    return prevValue + 1;
                  });
                }}
              >
                UPP{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
