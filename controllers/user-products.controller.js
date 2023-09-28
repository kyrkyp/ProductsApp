const User = require("../models/user.model.js");

exports.findAll = async (req, res) => {
  console.log("Finding all users products");

  try {
    const results = await User.find({}, { _id: 0, username: 1, products: 1 });

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};

exports.findOne = async (req, res) => {
  console.log("Finding for one user products");

  try {
    const results = await User.findOne(
      { username: req.params.username },
      { _id: 0, username: 1, products: 1 }
    );

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};

exports.addProduct = async (req, res) => {
  console.log("Creating user products");

  const usernane = req.body.username;
  const products = req.body.products;

  try {
    const results = await User.updateOne(
      { username: usernane },
      { $push: { products: products } }
    );

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  console.log("Updating user products");

  const username = req.params.username;
  const product_id = req.body.product._id;
  const product_quantity = req.body.product.product_quantity;

  try {
    const results = await User.updateOne(
      { username: username, "products._id": product_id },
      { $set: { "products.$.quantity": product_quantity } }
    );

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  const username = req.params.username;
  const product = req.params.product;

  try {
    const results = await User.updateOne(
      { username: username },
      { $pull: { products: { product: product } } }
    );

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};

exports.stats1 = async (req, res) => {
  console.log("Finding all users products");

  try {
    const results = await User.aggregate([
      { $unwind: "$products" },
      { $project: { _id: 0, username: 1, product: 1 } },
      {
        $group: {
          _id: { username: "$username", product: "$products.product" },
          total: {
            $sum: { $multiply: ["$products.cost", "$products.quantity"] },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ message: "Success", status: true, data: results });

    console.log(results);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    console.log(error.message);
  }
};
