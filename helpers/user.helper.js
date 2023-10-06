const User = require("../models/user.model");

async function findLastInsertedUser() {
  console.log("Finding last inserted user");

  try {
    const result = await User.find({}).sort({ _id: -1 }).limit(1);

    console.log("Found last inserted user", result);

    return result[0];
  } catch (err) {
    console.log("Error finding last inserted user", err.message);
  }
}

module.exports = { findLastInsertedUser };
