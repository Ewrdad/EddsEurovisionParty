import { createUser } from "../Connections/CreateUser.js";

const newSessionName = "test";

const connection = await createUser();
const sql = `INSERT INTO Session (id) VALUES (?)`;
const result = await connection.execute(sql, [newSessionName]);
console.log(result);
