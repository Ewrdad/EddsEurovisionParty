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
import countryList from "@/country-details-v1.json";

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
    const QualifiedCountries = sortedVotes.filter((value) => {
      if (value.country === "United Kingdom") {
        return false;
      }
      const found = countryList.find((element) => {
        return element.name === value.country;
      });
      return !found.dq;
    });
    const bottom3Countries = QualifiedCountries.slice(-3);
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
    }, 200000); // Fetch every 5 seconds
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
      <Grid size={9} className="pt-10 border-white/70 h-full pl-5">
        <Grid container className="justify-center text-center">
          {top3.First && <Top3Card country={top3.First} fakePoints={12} />}
          {top3.Second && <Top3Card country={top3.Second} fakePoints={10} />}
          {top3.Third && <Top3Card country={top3.Third} fakePoints={8} />}
        </Grid>
      </Grid>
      <Grid size={3} className="pt-10 border-white/70 h-full w-10">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            startIndex: 1,
          }}
          setApi={setApi}
          className="w-70"
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
        <div className="w-70">
          {bottom3.First && <Generic country={bottom3.First} />}
          {bottom3.Second && <Generic country={bottom3.Second} />}
          {bottom3.Third && <Generic country={bottom3.Third} />}
        </div>
      </Grid>
      <Grid
        size={11}
        className="bg-white/50 text-shadow-lg backdrop-blur-3xl rounded-4xl"
      >
        <h1 className="text-xl">Running Order</h1>
        <Grid container className="justify-center text-center">
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">1| 🇳🇴</p>
            <p className="text-2xl">2| 🇱🇺</p>
            <p className="text-2xl">3| 🇪🇪</p>
          </Grid>{" "}
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">4| 🇮🇱</p>
            <p className="text-2xl">5| 🇱🇹 </p>
            <p className="text-2xl">6| 🇪🇸</p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">7| 🇺🇦</p>
            <p className="text-2xl">8| 🇬🇧</p>
            <p className="text-2xl">9| 🇦🇹</p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">10| 🇮🇸</p>
            <p className="text-2xl">11| 🇱🇻</p>
            <p className="text-2xl">12| 🇳🇱</p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">13| 🇫🇮 </p>
            <p className="text-2xl">14| 🇮🇹 </p>
            <p className="text-2xl">15| 🇵🇱 </p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">16| 🇩🇪 </p>
            <p className="text-2xl">17| 🇬🇷 </p>
            <p className="text-2xl">18| 🇦🇲</p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">19| 🇨🇭 </p>
            <p className="text-2xl">20| 🇲🇹 </p>
            <p className="text-2xl">21| 🇵🇹 </p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">22| 🇩🇰 </p>
            <p className="text-2xl">23| 🇸🇪 </p>
            <p className="text-2xl">24| 🇫🇷 </p>
          </Grid>
          <Grid
            size={1}
            className="align-top content-start text-left border-white/70 h-full w-10"
          >
            <p className="text-2xl">25| 🇸🇲 </p>
            <p className="text-2xl">26| 🇦🇱 </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
