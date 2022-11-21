const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const mongoUrl =
  "mongodb+srv://thangnd293:thangnd293@dacthangcluster.aha3w.mongodb.net/shopme";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connection database successfully"));

const port = process.env.PORT || 2000;
app.listen(port, function (req, res) {
  console.log(`Listening on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("errorrrrrrrrrrrrrrrrrrrrrrr");
  server.close(() => {
    process.exit(1);
  });
});
