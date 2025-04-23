import { APIUrl } from "@/APIUrl";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Top3Card } from "./Top3Card";
import { Generic } from "./Generic";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ShortsPannel } from "./ShortsFeed/ShortsPannel";

export const Dashboard = () => {
  const [votes, setVotes] = useState([]);
  const [top3, setTop3] = useState({ First: null, Second: null, Third: null });
  const [bottom3, setBottom3] = useState({
    First: null,
    Second: null,
    Third: null,
  });
  const [rest, setRest] = useState([]);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const navigate = useNavigate();
  useEffect(() => {
    //setTop3
    const sortedVotes = [...votes].sort((a, b) => b.votes - a.votes);
    const top3Countries = sortedVotes.slice(0, 3);
    const top3Data = {
      First: top3Countries[0],
      Second: top3Countries[1],
      Third: top3Countries[2],
    };
    setTop3(top3Data);
    //setBottom3
    const bottom3Countries = sortedVotes.slice(-3);
    const bottom3Data = {
      First: bottom3Countries[0],
      Second: bottom3Countries[1],
      Third: bottom3Countries[2],
    };
    setBottom3(bottom3Data);

    //setRest
    const restCountries = sortedVotes.slice(3, -3);

    setRest(restCountries);

    toast.success("Votes updated");
  }, [votes]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get(
          `${APIUrl}/dashboard/votes`,

          { withCredentials: true }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch votes");
        }
        const data = await response;
        console.log("Votes data:", data);
        setVotes(data.data.votes);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    toast.warning("Click title to go back to the user page");

    fetchVotes();
    const interval = setInterval(() => {
      fetchVotes();
    }, 600000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Grid container className="justify-center text-center">
      <Grid size={11} className="pt-10">
        <h1
          className="text-7xl text-shadow-lg"
          onClick={() => {
            navigate("/user");
          }}
        >
          Eurovision Party 2025
        </h1>
      </Grid>
      <Grid size={9} className="pt-10 border-white/70 h-full">
        <Grid container className="justify-center text-center">
          {top3.First && <Top3Card country={top3.First} fakePoints={12} />}
          {top3.Second && <Top3Card country={top3.Second} fakePoints={10} />}
          {top3.Third && <Top3Card country={top3.Third} fakePoints={8} />}
        </Grid>
      </Grid>
      <Grid size={3} className="pt-10 border-white/70 h-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 40000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            <CarouselItem>
              {" "}
              <div className="h-130 overflow-y-scroll">
                {rest.map((country, index) => (
                  <Generic country={country} key={index} />
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <ShortsPannel isActive={current == 2} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {bottom3.First && <Generic country={bottom3.First} />}
        {bottom3.Second && <Generic country={bottom3.Second} />}
        {bottom3.Third && <Generic country={bottom3.Third} />}
      </Grid>
    </Grid>
  );
};
