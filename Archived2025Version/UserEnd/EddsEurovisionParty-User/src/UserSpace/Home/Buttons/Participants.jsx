import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Participants = () => {
  const navigator = useNavigate();
  return (
    <TooltipProvider className="w-full">
      <Tooltip>
        <TooltipTrigger className="w-full h-1/3 pb-2">
          {" "}
          <Button
            variant="outlined"
            className="bg-gradient-to-r from-amber-500/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 h-full rounded-4xl text-shadow-lg text-4xl shadow-2xl  focus:ring-8"
            onClick={() => {
              navigator("/user/vote");
            }}
          >
            <p className="m-2 ">Participants</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white/40 rounded-4xl">
          <p>Track votes, View facts and more!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
