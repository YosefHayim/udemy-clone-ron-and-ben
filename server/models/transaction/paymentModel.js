const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["success", "failed"], required: true },
    method: { type: String },
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
