import { readUser } from "../../../Connections/ReadUser.js";

export const UsersForSession = async (req, res) => {
  if (!req.session.sessionId) {
    console.log(req.session);
    res.status(400).send({ message: "No session to request", users: null });
    return;
  }

  const connection = await readUser();
  const sql = `SELECT * FROM User WHERE session_id = ?`;
  const sessionId = req.session.sessionId;
  const [results, fields] = await connection.execute(sql, [sessionId]);
  console.log(results);
  if (results.length == 0) {
    return res
      .status(404)
      .json({ message: "No users found for session", users: null });
  }

  res.status(200).json({
    message: "Users found for session",
    users: results,
  });
  connection.end();
  return 200;
};
