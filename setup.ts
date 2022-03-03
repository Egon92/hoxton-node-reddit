import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    displayName TEXT,
    PRIMARY KEY (id)
    CHECK(password <> '')
  );


  CREATE TABLE posts (
    id INTEGER,
    userId INTEGER,
    title TEXT,
    content TEXT,
    createdAt TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
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

const createUser = db.prepare(`
INSERT INTO users (name, email, password, displayName) VALUES (?,?,?,?)`);

for (const user of users) {
  createUser.run(user.name, user.email, user.password, user.displayName);
}
