import { Grid } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Weather } from "./Weather";

export const Home = ({ user }) => {
  const navigator = useNavigate();

  return (
    <Grid container className="justify-center text-center">
      <Grid size={11} className="pt-10">
        <Weather />
        <h1 className="text-7xl">Welcome</h1>
        <h3 className="text-4xl">{user.name || "you"}</h3>
      </Grid>
      <Grid size={11}>
        <Separator orientation="horizontal" className="bg-black mt-5" />
      </Grid>
      <Grid size={11} className="h-[60vh]">
        <Button
          variant="outlined"
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3"
          onClick={() => {
            navigator("/user/vote");
          }}
        >
          <p className="m-2 ">Vote</p>
        </Button>
        <Button
          variant="outlined"
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3"
        >
          <p className="m-2 ">Food</p>
        </Button>
      </Grid>
      <Grid size={11} className="h-full content-end align-bottom">
        <a href="https://youtu.be/1af8llc2OBI?si=IjtghkwJgcJtFiWI">
          <Button
            variant="outlined"
            className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2"
          >
            Recap last years drama
          </Button>
        </a>
      </Grid>
      <Grid size={11} className="h-full content-end align-bottom">
        <Button
          variant="outlined"
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2"
        >
          Dashboard
        </Button>
      </Grid>
    </Grid>
  );
};
