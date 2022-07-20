const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

// app.use((req, res, next) => {
//   const start = Date.now();
//   next();
//   const delta = Date.now() - start;
//   console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
// });

// app.use("/site", express.static(path.join(__dirname, "public")));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "My Friends Are VERYY Clever",
//     caption: "Let's go skiing!",
//   });
// });

const friends = [
  { id: 0, name: "Flynn" },
  { id: 1, name: "Danelle" },
];

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:id", (req, res) => {
  const friendId = Number(req.params.id);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
});
// app.use("/friends", friendsRouter);
// app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
