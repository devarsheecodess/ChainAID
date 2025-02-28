const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    vision: {
      type: String,
      required: true,
      trim: true,
    },
    donationAim: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    donationAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      enum: ["ETH", "BTC", "USDT", "USD", "EUR"], // Adjust based on supported currencies
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    website: {
      type: String,
      required: false,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrgInfo", OrganizationSchema);
