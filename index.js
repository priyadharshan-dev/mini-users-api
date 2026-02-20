// Import dependencies
const express = require("express");

// App Setup
const app = express();
const PORT = 3000;

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
app.listen(PORT, () => {
    console.log(`server running at http://localhost: ${PORT}`);
}); 


