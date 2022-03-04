import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});

const createUser = db.prepare(`
INSERT INTO users (name, email, password, displayName) VALUES (?,?,?,?)`);

app.post(`/login`, (req, res) => {
  const { email, password } = req.body;
});

app.post(`/users`, (req, res) => {
  const { name, email, password, displayName } = req.body;
  const info = createUser.run(name, email, password, displayName);
  res.send();
});

app.listen(4000, () => {
  console.log(`Running on http://localhost:4000`);
});
