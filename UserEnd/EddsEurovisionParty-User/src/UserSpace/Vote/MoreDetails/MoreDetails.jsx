import { Genuis } from "./Genuis";
import { YoutubeVideo } from "./YoutubeVideo";
import { TON } from "./TON";

export const MoreDetails = ({ detail }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {detail.type == "Youtube" && <YoutubeVideo detail={detail} />}
      {detail.type == "Genuis" && <Genuis detail={detail} />}
      {detail.type == "TON" && <TON detail={detail} />}
    </div>
  );
};
