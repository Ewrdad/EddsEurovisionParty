import { Genuis } from "./Genuis";
import { YoutubeVideo } from "./YoutubeVideo";
import { TON } from "./TON";
import { Profile } from "./Profile";
import { SU2C } from "./SU2C";

export const MoreDetails = ({ detail }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {detail.type == "Youtube" && <YoutubeVideo detail={detail} />}
      {detail.type == "Genuis" && <Genuis detail={detail} />}
      {detail.type == "TON" && <TON detail={detail} />}
      {detail.type == "Profile" && <Profile detail={detail} />}
      {detail.type == "SU2C" && <SU2C />}
    </div>
  );
};
