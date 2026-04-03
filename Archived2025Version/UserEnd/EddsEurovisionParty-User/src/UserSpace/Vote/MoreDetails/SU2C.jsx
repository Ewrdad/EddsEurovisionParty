import { Button } from "@/components/ui/button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
export const SU2C = () => {
  return (
    <>
      <a href="https://donate.cancerresearchuk.org/stand-up-to-cancer/your-donation">
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black text-xl p-4 w-full mt-2 rounded-4xl text-shadow-lg shadow-2xl  focus:ring-8">
          <p className="text-2xl">
            {" "}
            <ArrowUpwardIcon /> Donate to Stand Up 2 Cancer
          </p>
        </Button>
      </a>
    </>
  );
};
