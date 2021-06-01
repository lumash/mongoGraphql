//const mongoose = require("../database");
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  itemId: { type: String, required: true },
  itemPrice: { type: Number, required: true },
});

//const OrderItem = mongoose.model("OrderItem", orderItemSchema, "orderItems");

module.exports = orderItemSchema;
