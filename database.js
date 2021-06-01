const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/RestaurantOrders", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB ..."))
  .catch((err) => console.log("Couldn't conncet to mongoDB ..."));

module.exports = mongoose;
