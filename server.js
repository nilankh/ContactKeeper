const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Db
connectDB();

//Init Middleware(to use req.body we need to need to use middleware, pehle third party body parser install krte the but ap express ke saath aata hi h)
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.send({ msg: "Welcome to the ContactKeeper API....." })
);

// Defines Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
