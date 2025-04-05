import mysql2 from "mysql2";
// import Countries from "../../UserEnd/EddsEurovisionParty-User/src/country-details-v1.json" assert { type: "json" };
import { createUser } from "../Connections/CreateUser.js";
import { readFile } from "fs/promises";

const connection = await createUser();

const Countries = JSON.parse(
  await readFile(
    new URL(
      "../../UserEnd/EddsEurovisionParty-User/src/country-details-v1.json",
      import.meta.url
    )
  )
);

const countryList = Countries.map((country) => country.name);

for (const country of countryList) {
  const query = `INSERT IGNORE INTO Vote (country, votes) VALUES (?, 0)`;
  await connection.execute(query, [country]);
  console.log(`Inserted country: ${country}`);
}
console.log("Countries loaded successfully");
connection.end();
