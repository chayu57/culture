const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const sensorDataRoutes = require("./routes/sensordataRoutes");



app.use(cors());
app.use(bodyParser.json());
app.use("/api", sensorDataRoutes);

const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://chaitanya:MG76UbqEorfSUKMc@cluster0.lrwjfei.mongodb.net/agriculture?retryWrites=true&w=majority")
  .then((result) => {
    console.log("app is running...");
    app.listen(port);
  }).catch((err) => {
    console.log(err);
  });


  