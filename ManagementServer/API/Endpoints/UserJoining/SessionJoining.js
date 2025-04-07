import { readUser } from "../../../Connections/ReadUser.js";

export const SessionJoining = async (req, res) => {
  const connection = await readUser();
  const sql = `SELECT * FROM Session WHERE id = ?`;

  if (!req.body || !req.body.sessionId) {
    res.status(400).json({ message: "Session ID is required" });
    return;
  }

  const sessionId = req.body.sessionId;

  const [results, fields] = await connection.execute(sql, [sessionId]);
  console.log(results);
  if (results.length == 0) {
    return res.status(404).json({ message: "Session not found" });
  }
  if (results.length >= 2) {
    return res.status(501).json({ message: "More than one session found" });
  }
  const session = results[0].id;

  req.session.sessionId = sessionId;

  res.status(200).json({
    message: "Session joined successfully",
    sessionId: sessionId,
  });
  connection.end();
};
