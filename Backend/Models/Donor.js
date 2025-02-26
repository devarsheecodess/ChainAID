const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  joinedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donor", donorSchema);
