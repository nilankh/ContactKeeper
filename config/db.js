// THis is also correct
// const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("mongoURI");

// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//       // these above 3 are just to ignore the warnigns
//     })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

// module.exports = connectDB;

// second way of connecting by using async await

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      // these above 3 are just to ignore the warnigns
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
