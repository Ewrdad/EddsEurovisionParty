import { createUser } from "../../../Connections/CreateUser.js";
import { readUser } from "../../../Connections/ReadUser.js";
import { v4 } from "uuid";

const newUserJoin = async (req, res) => {
  const username = req.body.newName;
  const sessionId = req.session.sessionId;

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }
  const connection = await createUser();

  const sql = "INSERT INTO User (id, name, session_id) VALUES (?,?, ?)";
  const newId = v4();
  const params = [newId, username, sessionId];

  const value = await connection.execute(sql, params);
  req.session.userId = newId;
  req.session.username = username;

  res.status(200).json({ message: "User created successfully" });
};

const existingUserJoin = async (req, res) => {
  const username = req.body.id;
  const sessionId = req.session.sessionId;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  const connection = await readUser(username);

  const sql = "SELECT * FROM User WHERE id = ? AND session_id = ?";
  const params = [username, sessionId];
  const value = await connection.execute(sql, params);

  req.session.userId = value[0][0].id;
  req.session.username = value[0][0].name;

  res.status(200).json({ message: "User joined successfully" });
};

/**
 * MARK: UserJoin
 * @description Joins the user to the session. By setting the sessionId and username in the session.
 * @param {*} req.body.newName can given if there is a new name
 * @param {*} req.body.id can given if there is an existing name
 * @param {*} res
 */
export const UserJoin = async (req, res) => {
  const { newName, id } = req.body;
  const sessionId = req.session.sessionId;
  console.log(req.session);

  if (!sessionId) {
    res.status(400).json({ message: "Session ID is required" });
    return;
  }

  if (newName) {
    await newUserJoin(req, res);
    return;
  } else if (id) {
    await existingUserJoin(req, res);
    return;
  } else {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
};
