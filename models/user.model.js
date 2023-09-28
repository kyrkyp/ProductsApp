const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let addressSchema = new Schema({
  area: { type: String },
  road: { type: String },
});

let phoneSchema = new Schema(
  {
    type: { type: String },
    number: { type: String },
  },
  { _id: false }
);

let productsSchema = new Schema(
  {
    product: { type: String },
    cost: { type: Number },
    quantity: { type: Number, required: true, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      max: 10,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      max: 15,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      max: 50,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    address: addressSchema,
    phone: { type: [phoneSchema], null: true },
    products: { type: [productsSchema], null: true },
  },
  { collection: "users", timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

module.exports = mongoose.model("User", userSchema);
