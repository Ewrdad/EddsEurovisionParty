import express from "express";

console.log("Starting server...");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/session/join", (req, res) => {
  res.send("Join session");
});
app.post("/session/user/join", (req, res) => {
  res.send("Join session user");
});

app.post("/session/user/votes", (req, res) => {
  res.send("Join session user");
});

app.post("/vote", (req, res) => {
  res.send("Vote");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
