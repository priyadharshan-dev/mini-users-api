// Imports & setup
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


// In-memory data (temporary database)
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
];

// Basic routes
app.get("/",(req,res) => {
    res.send("I understand this now");
});

app.get("/health", (req,res) => {
    res.json({
        status: "ok",
        uptime: "running",
    });
});

app.get("/greet", (req,res) => {
    const name = req.query.name;
    res.send(`Hello ${name}`);
});


// User related routes
app.get("/users", (req,res) => {
    const role = req.query.role;

    if(!role){
        return res.json(users);
    }

    const filteredUsers = users.filter(user => user.role === role);
    res.json(filteredUsers);
});

app.get("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);
    if(!user){
        return res.status(404).json({ error: "User not found"});
    }

    res.json(user);

});

app.post("/users", (req,res) => {
    const {name, role} = req.body;

    if (!name || !role) {
        return res.status(404).json({ error: "name and role are required"});
    }

    const newUser = {
        id: users.length + 1,
        name, 
        role,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name && !role) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  if (name) user.name = name;
  if (role) user.role = role;

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost: ${PORT}`);
}); 


