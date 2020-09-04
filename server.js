const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Db
connectDB();

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
