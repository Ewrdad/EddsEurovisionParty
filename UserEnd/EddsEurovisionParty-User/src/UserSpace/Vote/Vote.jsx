import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import CountryList from "@/country-details-v1.json";
import { CountryCard } from "./CountryCard";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIUrl } from "@/APIUrl";

export const Vote = () => {
  const navigator = useNavigate();
  const [totalVotes, setTotalVotes] = useState({});
  const [defaultVotes, setDefaultVotes] = useState(null);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const response = await axios.get(`${APIUrl}/user/votes`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const votes = JSON.parse(response.data.votes);
          console.log("Votes: ", votes);
          setTotalVotes(votes ?? {});
          setDefaultVotes(votes ?? {});
        } else {
          console.error("Error fetching votes: ", response);
        }
      } catch (error) {
        console.error("Error fetching votes: ", error);
      }
    };
    getVotes();
  }, []);
  const votesSum = useMemo(() => {
    return Object.values(totalVotes).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }, [totalVotes]);

  const votesLimit = useMemo(() => {
    if (votesSum === 20) return "equal";
    if (votesSum > 20) return "over";
    return "under";
  }, [votesSum]);

  useEffect(() => {
    votesLimit == "over" &&
      toast.warning(
        `You are only allowed to vote up to 20 times. \n You are currently over by ${
          votesSum - 20
        }+ votes. `
      );
    votesLimit == "equal" &&
      toast.warning(`You have reached your 20 vote limit. `);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesLimit]);

  return (
    <Grid container className="justify-center text-center">
      <Grid size={11} className="pt-10">
        <Button
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3"
          onClick={() => {
            navigator("/user");
          }}
        >
          Go Back
        </Button>
      </Grid>
      <Grid size={11}>
        <div className={votesSum >= 20 ? "bg-amber-400/75" : "bg-white/75"}>
          <h3 className="text-xl">Total Votes: {votesSum}/20</h3>
        </div>
      </Grid>
      {defaultVotes &&
        CountryList.map((country) => (
          <CountryCard
            key={country.name}
            country={country}
            setTotalVotes={setTotalVotes}
            defaultVotes={defaultVotes[country.name] || 0}
          />
        ))}
    </Grid>
  );
};
