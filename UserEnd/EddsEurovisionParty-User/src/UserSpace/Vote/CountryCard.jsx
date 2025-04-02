/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, Paper } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MoreDetails } from "./MoreDetails/MoreDetails";

export const CountryCard = ({ country, setTotalVotes }) => {
  const [votes, setVotes] = useState(0);
  const timerId = useRef(null);

  /**
   * @function handleVoteChange
   * @description Handles vote changes and sets a timer for fetching.
   */
  const handleVoteChange = useCallback(() => {
    // Clear the previous timer if it exists
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    // Set a new timer
    timerId.current = setTimeout(() => {
      console.log("Fetch", votes); // Replace with your fetch logic
      timerId.current = null; // Reset the timer ID
    }, 1000); // 5-second delay
  }, [votes]);

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
    setTotalVotes((prevValue) => ({ ...prevValue, [country.name]: votes }));
  }, [country.name, votes]);

  const shouldBeZero = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
      return true;
    }
    if (value <= 0) {
      return true;
    }
  };

  const shouldBe20 = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
      return false;
    }
    if (value >= 20) {
      return true;
    }
  };

  return (
    <Grid size={11} className="p-2 object-cover">
      <div className="bg-white/75">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <Grid container className="justify-center text-center">
              <Grid size={4} className="content-center">
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className=" h-full w-full overflow-clip justify-center bg-amber-500 object-cover self-center"
                />
              </Grid>
              <Grid size={8} className="content-center">
                <Grid container className="justify-center text-center h-full">
                  <Grid size={12} className="content-center">
                    <h1 className="text-lg">{country.song}</h1>
                    <h1 className="text-sm">{country.artist}</h1>
                  </Grid>
                  <Grid size={4} className="content-center">
                    <Button
                      className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 mt-2 h-3/4 w-full"
                      onClick={() => {
                        setVotes((prevValue) => {
                          if (shouldBeZero(prevValue)) {
                            return 0;
                          }
                          return prevValue - 1;
                        });
                      }}
                    >
                      <ThumbDownAltIcon className="text-2xl" />
                      <div className="hidden sm:block">DOWN </div>
                    </Button>
                  </Grid>
                  <Grid size={4} className="content-center">
                    <Input
                      value={votes}
                      className="h-3/4 w-full content-center text-7xl"
                      type="number"
                      onChange={(event) => {
                        const numberValue = parseInt(event.target.value, 10);
                        if (shouldBeZero(numberValue)) {
                          setVotes(0);
                          return;
                        }
                        if (shouldBe20(numberValue)) {
                          setVotes(20);
                          return;
                        }
                        setVotes(numberValue);
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
                          if (shouldBe20(prevValue)) {
                            return 20;
                          }
                          return prevValue + 1;
                        });
                      }}
                    >
                      <ThumbUpIcon className="text-2xl" />
                      <div className="hidden sm:block">UP </div>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>{" "}
              <Grid
                size={12}
                className="content-center bg-amber-800/75 w-full text-sm pl-2 pr-2 h-1/2"
              >
                <AccordionTrigger className="h-1/2">
                  Learn More?
                </AccordionTrigger>
              </Grid>
            </Grid>
            <AccordionContent>
              {country.moreDetails &&
                country.moreDetails.map((detail) => (
                  <MoreDetails key={detail.title} detail={detail} />
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Grid>
  );
};
