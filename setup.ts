import Database from "better-sqlite3";
import { createJSDocComment } from "typescript";

const db = new Database("./data.db", {
  verbose: console.log,
});

db.exec(`

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS subreddits;

  CREATE TABLE users (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    displayName TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
    CHECK(password <> '')
  );
  
  CREATE TABLE posts (
    id INTEGER,
    userId INTEGER,
    title TEXT,
    content TEXT,
    subredditId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
  );

  CREATE TABLE comments (
    id INTEGER,
    postId INTEGER,
    userId INTEGER,
    content TEXT,
    upvotes INTEGER,
    downvotes INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE subreddits (
    id INTEGER,
    title TEXT NOT NULL UNIQUE,
    CHECK (title <> ''),
    PRIMARY KEY (id)
  );
`);
const users = [
  {
    name: "Egon",
    email: "egon@gmail.com",
    password: "egooon",
    displayName: "el",
  },
  {
    name: "Nicolas",
    email: "nicolas@gmail.com",
    password: "nicolaaas",
    displayName: "nicomac",
  },
  {
    name: "Ed",
    email: "ed@gmail.com",
    password: "eddie",
    displayName: "poo tans",
  },
  {
    name: "Visard",
    email: "",
    password: "vizovizo",
    displayName: "",
  },
];

const subreddits = [
  {
    title: "Fun",
  },
  {
    title: "Overwhelming",
  },
  {
    title: "Cool Stuff",
  },
];

const posts = [
  {
    userId: 1,
    title: "Hellow people!",
    content: "People are awesome",
    subredditId: 1,
  },
  {
    userId: 2,
    title: "Hellow world!",
    content: "World has 200 states",
    subredditId: 2,
  },
  {
    userId: 3,
    title: "Relax",
    content: "Today we don't have lessons",
    subredditId: 3,
  },
];

const comments = [
  {
    postId: 1,
    userId: 2,
    content: "That's a true comment dude!",
    upvotes: 3,
    downvotes: 1,
  },
  {
    postId: 2,
    userId: 1,
    content: "I don't like that!",
    upvotes: 1,
    downvotes: 2,
  },
  {
    postId: 3,
    userId: 3,
    content: "I like this post!",
    upvotes: 4,
    downvotes: 3,
  },
];

const createUser = db.prepare(`
INSERT INTO users (name, email, password, displayName) VALUES (?,?,?,?)`);

for (const user of users) {
  createUser.run(user.name, user.email, user.password, user.displayName);
}

const createSubreddit = db.prepare(`
INSERT INTO subreddits (title) VALUES (?)`);

for (const subreddit of subreddits) {
  createSubreddit.run(subreddit.title);
}

const createPost = db.prepare(
  `INSERT INTO posts (userId, title, content, subredditId) VALUES (?,?,?,?)`
);

for (const post of posts) {
  createPost.run(post.userId, post.title, post.content, post.subredditId);
}

const createComment = db.prepare(`
INSERT INTO comments (postId, userId, content, upvotes, downvotes) VALUES (?,?,?,?,?)`);

for (const comment of comments) {
  const { postId, userId, content, upvotes, downvotes } = comment;
  createComment.run(postId, userId, content, upvotes, downvotes);
}
