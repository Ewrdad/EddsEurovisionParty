import express from "express";
import session from "express-session";
import { SessionJoining } from "./Endpoints/UserJoining/SessionJoining.js";
import { UsersForSession } from "./Endpoints/UserJoining/UsersForSession.js";
import { UserJoin } from "./Endpoints/UserJoining/UserJoin.js";
import { GetMyVotes } from "./Endpoints/VoteHandling/GetMyVotes.js";
import { Vote } from "./Endpoints/VoteHandling/Vote.js";
import { GetVoteSum } from "./Endpoints/Dashboard/GetVotesSum.js";
Function.prototype.safe = function (...args) {
  try {
    const value = this(...args);
    return { value, error: null };
  } catch (error) {
    return { value: null, error };
  }
};
Function.prototype.safeAsync = async function (...args) {
  try {
    const value = await this(...args);
    return { value, error: null };
  } catch (error) {
    return { value: null, error };
  }
};

// MARK: Settup
console.log("Starting server...");
const app = express();
const port = 3000;

// MARK: Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my-secret", // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
// middleware to reject requests without a sessionId and a userid unless the request is to the session endpoint
app.use((req, res, next) => {
  if (
    !req.session.sessionId &&
    !req.session.userId &&
    !req.path.startsWith("/session")
  ) {
    return res
      .status(401)
      .send({ message: "Unauthorized", invalidateSession: true });
  }
  next();
});

app.get("/sesh", (req, res) => {
  res.send({ ...req.session });
});
app.get("/sesh/clear", (req, res) => {
  if (!req.session.sessionId) {
    return res.status(400).send({ message: "No session to clear" });
  }

  req.session.destroy();
  res.send({ message: "Session cleared" });
});

// MARK: Session Join Routes
app.post("/session/join", async (req, res) => {
  const { value, error } = await SessionJoining.safeAsync(req, res);
  if (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
app.post("/session/user", (req, res) => {
  const { value, error } = UsersForSession.safe(req, res);
  if (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/session/user/join", async (req, res) => {
  const { value, error } = await UserJoin.safeAsync(req, res);
  if (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// MARK: Voting Routes
app.get("/user/votes", (req, res) => {
  GetMyVotes(req, res);
});

app.post("/vote", (req, res) => {
  Vote(req, res);
});

// MARK: Dashboard

app.get("/dashboard/votes", async (req, res) => {
  const { value, error } = GetVoteSum.safeAsync(req, res);
  if (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
