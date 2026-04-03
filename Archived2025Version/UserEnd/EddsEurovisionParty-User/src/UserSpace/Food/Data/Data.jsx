import CountryList from "@/country-details-v1.json";
import { ItalyFood } from "./FoodList/Italy";
import { UkraineFood } from "./FoodList/Ukraine";
import { CzechiaFood } from "./FoodList/Czechia";
import { SwitzerlandFood } from "./FoodList/Switzerland";
import { SpainFood } from "./FoodList/Spain";
import { FranceFood } from "./FoodList/France";
import { NetherlandsFood } from "./FoodList/Netherlands";
import { GreeceFood } from "./FoodList/Greece";
import { GermanyFood } from "./FoodList/Germany";
import { AustraliaFood } from "./FoodList/Australia";

export const FoodData = () => {
  const countries = {};

  for (const country of CountryList) {
    countries[country.name] = { flagUrl: country.flagUrl, food: [] };
  }

  countries["Italy"].food = ItalyFood;
  countries["Ukraine"].food = UkraineFood;
  countries["Czechia"].food = CzechiaFood;
  countries["Switzerland"].food = SwitzerlandFood;
  countries["Spain"].food = SpainFood;
  countries["France"].food = FranceFood;
  countries["Netherlands"].food = NetherlandsFood;
  countries["Greece"].food = GreeceFood;
  countries["Germany"].food = GermanyFood;
  countries["Australia"].food = AustraliaFood;

  //filter out countires where food is empty
  for (const country in countries) {
    if (countries[country].food.length === 0) {
      delete countries[country];
    }
  }

  return countries;
};
