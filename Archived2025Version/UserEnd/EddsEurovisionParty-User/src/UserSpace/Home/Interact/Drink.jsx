import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";

export const Drink = () => {
  const drinkin = [
    "On stage costume change",
    "The host changes outfit",
    "UK gets 12 points",
    "Something doesn't go to plan",
    "There's a dance break",
    "Someone mentions chocolate, cheese or fondue",
    "There's a key change",
    "See a Welsh flag",
  ];

  return (
    <>
      <Nav page={4} />
      <h3 className="text-4xl font-bold">Drink When...</h3>
      {drinkin.map((drink, index) => (
        <div key={index} className="text-2xl bg-white/20 rounded-4xl p-2 m-2">
          <p>{drink}</p>
        </div>
      ))}
      <p>Drink responsibly</p>
      <a href="https://www.nhs.uk/conditions/alcohol-misuse/">
        <Button className="bg-gradient-to-r from-amber-400/60 via-amber-600 to-amber-400/60  hover:bg-blue-800 text-black p-4 w-full mt-2 rounded-4xl text-shadow-lg text-xl shadow-2xl  focus:ring-8">
          NHS advice
        </Button>
      </a>

      <Nav page={4} />
    </>
  );
};
