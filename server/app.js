require("dotenv").config();
const express = require("express");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const db = require("./db/index");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const usersController = require("./controllers/users");
const songsController = require("./controllers/songs");
const searchController = require("./controllers/search");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);

app.use("/api", usersController);
app.use("/api", songsController);
app.use("/api", searchController);

app.listen(PORT, () => {
  console.log(`server is listening on port:${PORT}`);
});
