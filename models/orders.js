const mongoose = require("../database");
const OrderItem = require("./orderItem");
const ordersSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  userAddress: { type: String },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now() },
  orderItems: { type: [OrderItem] },
});

const Order = mongoose.model("Order", ordersSchema, "orders");

module.exports = Order;
