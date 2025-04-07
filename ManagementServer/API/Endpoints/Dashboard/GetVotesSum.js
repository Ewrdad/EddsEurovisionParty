import { readUser } from "../../../Connections/ReadUser.js";
export const GetVoteSum = async (req, res) => {
  const sql = "SELECT * FROM Vote";
  const params = [];
  const connection = await readUser();
  const results = await connection.execute(sql, params);
  connection.end();

  const votes = results[0];
  console.log(votes);
  res.send({
    message: "Votes retrieved",
    votes: votes,
  });
};
