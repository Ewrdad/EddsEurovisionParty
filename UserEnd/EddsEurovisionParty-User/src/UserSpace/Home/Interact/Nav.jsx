import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Nav = ({ page }) => {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="text-2xl">
      <Button
        onClick={() => {
          scrollPrev();
        }}
        className="hover:bg-amber-300/40 rounded-4xl"
      >
        <ArrowBackIcon />
      </Button>
      {page}/2
      <Button
        onClick={() => {
          scrollNext();
        }}
        className="hover:bg-amber-300/40 rounded-4xl"
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
};
