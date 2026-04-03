import { useEffect, useState } from "react";
import countryList from "@/country-details-v1.json";
export const Generic = ({ country }) => {
  const [classNam, setClassNam] = useState(
    "h-fit mb-4 w-full bg-white/70 text-shadow-lg backdrop-blur-3xl"
  );
  const [dq, setDq] = useState(false);

  useEffect(() => {
    const searchForDq = () => {
      const found = countryList.find((element) => {
        return element.name === country.country;
      });
      console.log(found);
      if (found.dq == true) {
        setClassNam(
          "h-fit mb-4 w-full bg-amber-500/70 text-shadow-lg backdrop-blur-3xl"
        );
        setDq(true);
      }
    };
    searchForDq();
  }, [country]);
  return (
    <div className={classNam}>
      {dq && "Didn't Qualify :"} {country.country} : {country.votes} votes
    </div>
  );
};
