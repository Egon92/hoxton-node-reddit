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

const getUsers = db.prepare(`
SELECT * FROM users;
`);

const getUserbyId = db.prepare(`
SELECT * FROM users WHERE id = (?);
`);

const getPosts = db.prepare(`
SELECT * FROM posts;
`);

const getPostById = db.prepare(`
SELECT * FROM posts WHERE id = (?);
`);

const getComments = db.prepare(`
SELECT * FROM comments;
`);

const getCommentById = db.prepare(`
SELECT * FROM comments WHERE id = (?);
`);

const getSubreddits = db.prepare(`
SELECT * FROM subreddits
`);

const getSubredditById = db.prepare(`
SELECT * FROM subreddits WHERE id = (?)
`);

app.get(`/users`, (req, res) => {
  const users = getUsers.all();
  res.send(users);
});

app.get(`/users/:id`, (req, res) => {
  const id = req.params.id;
  const user = getUserbyId.get(id);
  if (user) {
    res.send(user);
  } else res.status(404).send({ error: "Not found!" });
});

app.get(`/posts`, (req, res) => {
  const posts = getPosts.all();
  res.send(posts);
});

app.get(`/posts/:id`, (req, res) => {
  const id = req.params.id;
  const post = getPostById.get(id);
  if (post) {
    res.send(post);
  } else res.status(404).send({ error: "Not found!" });
});

app.get(`/comments`, (req, res) => {
  const comments = getComments.all();
  res.send(comments);
});

app.get(`/comments/:id`, (req, res) => {
  const id = req.params.id;
  const comment = getCommentById.get(id);
  if (comment) {
    res.send(comment);
  } else res.status(404).send({ error: "Not found!" });
});

app.get(`/subreddits`, (req, res) => {
  const subreddits = getSubreddits.all();
  res.send(subreddits);
});

app.get(`/subreddits/:id`, (req, res) => {
  const id = req.params.id;
  const subreddit = getSubredditById.get(id);
  if (subreddit) {
    res.send(subreddit);
  } else res.status(404).send({ error: "Not found!" });
});

// app.post(`/login`, (req, res) => {
//   const { email, password } = req.body;
// });

// app.post(`/users`, (req, res) => {
//   const { name, email, password, displayName } = req.body;
//   const info = createUser.run(name, email, password, displayName);
//   res.send();
// });

app.listen(4000, () => {
  console.log(`Running on http://localhost:4000`);
});
