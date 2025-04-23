import CountryList from "@/country-details-v1.json";
import { ItalyFood } from "./FoodList/Italy";

export const FoodData = () => {
  const countries = {};

  for (const country of CountryList) {
    countries[country.name] = { flagUrl: country.flagUrl, food: [] };
  }

  countries["Italy"].food = ItalyFood;

  //filter out countires where food is empty
  for (const country in countries) {
    if (countries[country].food.length === 0) {
      delete countries[country];
    }
  }

  return countries;
};
