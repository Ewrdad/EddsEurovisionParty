import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FoodData } from "./Data/Data";
import { FoodCard } from "./FoodCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Food = () => {
  const navigator = useNavigate();
  console.log(FoodData());
  const countries = FoodData();
  const countryNames = Object.keys(countries);
  return (
    <div>
      <Button
        className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3"
        onClick={() => {
          navigator("/user");
        }}
      >
        Go Back
      </Button>
      {countryNames.map((country) => {
        return (
          <Accordion type="single" collapsible className="w-full p-2">
            <div className="bg-white/75">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-3xl p-4">
                  <img
                    src={countries[country].flagUrl}
                    className=" h-20 w-20 overflow-clip justify-center bg-amber-500 object-cover self-center"
                  />
                  {country}
                </AccordionTrigger>
                <AccordionContent>
                  {countries[country].food.map((food) => {
                    return (
                      <FoodCard
                        key={`${food}-${country}`}
                        country={country}
                        food={food}
                      />
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};
