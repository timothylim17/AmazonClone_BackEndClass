const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  full_name: String,
  prefix: String,
  gender: String,
  email: String,
  phone_number: Number,
  password: String,
  mfa: Boolean,
  business: {
    active: Boolean,
    items: Array,
  },
  lists: Array,
  orders: Array,
  picture: {
    profile: String,
    background: String,
  },
  address: String,
  payments: Array,
});

const itemSchema = mongoose.Schema({
  seller: String,
  name: String,
  price: Number,
  currency: String,
  description: String,
  reviews: String,
});

module.exports = {
  item: mongoose.model("item", itemSchema),
  account: mongoose.model("account", accountSchema),
};
