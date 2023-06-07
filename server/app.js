require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require('cors')



const db = require("./db/index");
const app = express();
const PORT = process.env.PORT || 3000;

const logger = require("./middleware/httpLogger");
const errorHandler = require("./middleware/httpLogger");

const sessionsController = require("./controllers/sessions");
const usersController = require("./controllers/users");
const songsController = require("./controllers/songs");
const searchController = require("./controllers/search");
const friendsController = require("./controllers/friends");

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

app.use(express.json());
app.use(express.static("client"));

app.use(logger);
app.use(cors({
  origin: '*',
}));
app.use("/api/sessions", sessionsController);
app.use("/api/users", usersController);
app.use("/api/songs", songsController);
app.use("/api/search", searchController);
app.use("/api/friends", friendsController);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on port:${PORT}`);
});
