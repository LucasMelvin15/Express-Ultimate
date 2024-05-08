import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

let mockUsers = [
  { id: 1, username: "alice", displayName: "Alice" },
  { id: 2, username: "bob", displayName: "bob" },
  { id: 3, username: "charlie", displayName: "Charlie" },
  { id: 4, username: "david", displayName: "David" },
  { id: 5, username: "eve", displayName: "Eve" },
];

app.get("/", (req, res) => {
  res.send("You will be so proud of yourself in 4 months");
});
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});
app.get("/api/users/:id", (req, res) => {
  //convert the id from a string to an interger
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  console.log(parsedId);
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
