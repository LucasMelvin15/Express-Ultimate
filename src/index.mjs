import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

let mockUsers = [
  { id: 1, username: "alice", displayName: "Alice" },
  { id: 2, username: "bob", displayName: "bob" },
  { id: 3, username: "charlie", displayName: "Charlie" },
  { id: 4, username: "david", displayName: "David" },
  { id: 5, username: "eve", displayName: "Eve" },
];

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.send(newUser);
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

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  console.log(req.body);
  //return res.send(req.body);
  return res.sendStatus(200);
});
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});
app.delete("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
