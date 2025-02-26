const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  orgID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: Number, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  certificate: { type: String, required: true },
  password: { type: String, required: true },
  joinedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Organization", organizationSchema);
