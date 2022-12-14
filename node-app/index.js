const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/5610proj", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connetion Successful");
  })
  .catch((err) => {
    console.log(err.message);
});


/*

mongoose
  .connect(process.env.MONGO_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB Connetion Successful");
  })
  .catch((err) => {
    console.log(err.message);
});

*/

app.use("/api/user", userRoutes);

app.listen(5000, console.log("server started"));