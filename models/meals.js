const mongoose = require("../database");
const mealsSchema = new mongoose.Schema({
  // id: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String },
  active: { type: Number, required: true },
  creared_at: { type: Date, default: Date.now() },
});

const Meal = mongoose.model("meals", mealsSchema);

module.exports = Meal;
