const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const connectString = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// mongoose
//   .connect(connectString)
//   .then(() => console.log('Connection database successfully'));

const app = require("./app");

const mongoUrl = `mongodb://admin:DRX1OYxkHm9PDBaH@sg-thangnd-48377.servers.mongodirector.com:27017/test?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
// const mongoUrl = `mongodb+srv://thangnd:kVCjpMjwvKd5vzFS@shopme.e2nl2.mongodb.net/test?retryWrites=true&w=majority`;

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
