import { readUser } from "../../../Connections/ReadUser.js";

export const GetMyVotes = async (req, res) => {
  const sql = `SELECT * FROM User WHERE id = ?`;
  const params = [req.session.userId];
  const connection = await readUser();

  const results = await connection.execute(sql, params);

  res.send({
    message: "Votes retrieved",
    votes: results[0][0].votes,
  });
  connection.end();
};
