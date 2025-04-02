import { Button } from "@/components/ui/button";
import LyricsIcon from "@mui/icons-material/Lyrics";
export const Genuis = ({ detail }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <a href={detail.url} target="_blank" rel="noopener noreferrer">
        <Button className="w-full p-8 bg-amber-600 hover:bg-amber-800 text-black text-xl">
          <LyricsIcon />
          Lyrics (Genuis)
        </Button>
      </a>
    </div>
  );
};
