const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  orgId: { type: String, required: true },
  donorId: { type: String, required: true },
  donorName: { type: String, required: true },
  orgName: { type: String, required: true },
  donorWalletAddress: { type: String, required: true },
  orgWalletAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  donatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
