import { Genuis } from "./Genuis";
import { YoutubeVideo } from "./YoutubeVideo";

export const MoreDetails = ({ detail }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {detail.type == "Youtube" && <YoutubeVideo detail={detail} />}
      {detail.type == "Genuis" && <Genuis detail={detail} />}
    </div>
  );
};
