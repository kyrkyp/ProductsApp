const User = require("../models/user.model");

const logger = require("../logger/logger");

exports.findAll = async (req, res) => {
  console.log("Finding all users");

  try {
    const result = await User.find();

    res.status(200).json({ status: true, data: result });

    console.log("Found all users", result);
    logger.info("Found all users", result);
    // logger.log("Logger log", result);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });

    console.log("Error finding all users", err.message);
  }
};

// exports.findAll = function (req, res) {
//   console.log("Finding all users");

//   User.find((err, result) => {
//     if (err) {
//       res.status(400).json({ status: false, message: err.message });
//       console.log("Error finding all users", err.message);
//     } else {
//       res.status(200).json({ status: true, data: result });
//       console.log("Found all users", result);
//     }
//   });
// };

exports.findOne = async (req, res) => {
  const username = req.params.username;

  console.log("Finding one user", username);

  try {
    const result = await User.findOne({ username: username });

    res.status(200).json({ status: true, data: "Find one user" });

    console.log("Found one user", username);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });

    console.log("Error finding one user", err.message);
  }
};

exports.create = async (req, res) => {
  console.log("Attemping to Creat user");

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products,
  });

  try {
    const result = await newUser.save();

    res.status(200).json({ status: true, data: result });

    console.log("Created user", result);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });

    console.log("Error creating user", err.message);
  }
};

exports.update = async (req, res) => {
  console.log("Attemping to Update user");

  const username = req.params.username;

  const updatedUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };

  try {
    const result = await User.findOneAndUpdate(
      { username: username },
      updatedUser,
      { new: true }
    );

    res.status(200).json({ status: true, data: result });

    console.log("Updated user", result);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });

    console.log("Error updating user", err.message);
  }
};

exports.delete = async (req, res) => {
  console.log("Attemping to Delete user");

  const username = req.params.username;

  try {
    const result = await User.findOneAndRemove({ username: username });

    res.status(200).json({ status: true, data: result });

    console.log("Deleted user", result);
  } catch (err) {}
  res.status(400).json({ status: false, message: err.message });

  console.log("Error deleting user", err.message);
};

// module.exports = { findAll };
