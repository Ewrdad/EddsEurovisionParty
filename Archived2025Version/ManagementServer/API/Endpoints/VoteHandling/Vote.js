import { readUser } from "../../../Connections/ReadUser.js";
import { updateUser } from "../../../Connections/UpdateUser.js";

/**
 * MARK: Vote Handling
 * @param {*} req.body.country
 * @param {*} req.body.points
 * @param {*} res
 */
export const Vote = async (req, res) => {
  //validate everything
  //get personal votes

  const { value: response, error: validationError } = ValidateSchema.safe(req);
  if (validationError || !response) {
    console.error("Error: ", validationError);
    res
      .status(400)
      .json({ message: "Invalid request", error: validationError.message });
    return;
  }

  // parse personal votes from JSON
  const { value: personalVotesTemp, error } = await GetPersonalVotes.safeAsync(
    req,
    res
  );
  if (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
  const personalVotes = await personalVotesTemp;
  // subtract from country total votes
  const { value: subValue, error: subError } = await subtractOldVotes.safeAsync(
    req,
    res,
    personalVotes
  );
  if (subError) {
    console.error("Error: ", subError);
    return res
      .status(500)
      .json({ message: "Internal server error", error: subError.message });
  }
  // set personal votes in object

  personalVotes[req.body.country] = req.body.points;
  // Write new votes to database
  // write new votes to database
  await addNewVotes(req, res, personalVotes);
  res.send({
    message: "Vote updated",
    votes: personalVotes,
  });
};

const ValidateSchema = (req) => {
  if (!req.body) {
    throw new Error("No body attached");
    return false;
  }

  if (!req.body.country) {
    throw new Error("No country attached");
    return false;
  }
  if (typeof req.body.country !== "string") {
    throw new Error("Country is not a string");
    return false;
  }

  if (isNaN(req.body.points) || typeof req.body.points !== "number") {
    throw new Error("Points is not a number");
    return false;
  }
  if (req.body.points < 0 || req.body.points > 20) {
    throw new Error("Points is not in range");
    return false;
  }

  return true;
};

/**
 * MARK: Get Personal Votes
 * @param {*} req
 * @param {*} res
 *
 * @return Object with votes
 */
const GetPersonalVotes = async (req, res) => {
  const sql = `SELECT * FROM User WHERE id = ?`;
  const params = [req.session.userId];
  const connection = await readUser();
  const results = await connection.execute(sql, params);
  connection.end();
  const userVotes = await results[0][0].votes;
  if (!userVotes) {
    return {};
  }
  const votes = JSON.parse(results[0][0].votes);
  return votes;
};

/**
 * MARK: Subtract Old Votes from Country
 * @param {*} req
 * @param {*} res
 */
const subtractOldVotes = async (req, res, personalVotes) => {
  const sql = " UPDATE Vote SET votes = votes - ? WHERE country = ?";
  console.log(
    await personalVotes,
    req.body.country,
    Object.keys(await personalVotes),
    await personalVotes[req.body.country]
  );
  const countriesOldVotes = await personalVotes[req.body.country];
  const params = [countriesOldVotes ?? 0, req.body.country];
  const connection = await updateUser();
  await connection.execute(sql, params);
  connection.end();
  return 200;
};

/**
 * MARK: Add new votes to the DB
 *
 *
 *
 */
const addNewVotes = async (req, res, personalVotes) => {
  const connection = await updateUser();

  //Update user
  const sql = "UPDATE User SET votes = ? WHERE id = ?";
  const params = [JSON.stringify(personalVotes), req.session.userId];
  await connection.execute(sql, params);

  //update country
  const sql2 = "UPDATE Vote SET votes = votes + ? WHERE country = ?";
  const params2 = [req.body.points, req.body.country];
  await connection.execute(sql2, params2);
  connection.end();
  return 200;
};
