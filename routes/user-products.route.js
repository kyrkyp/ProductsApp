const express = require("express");
const router = express.Router();

const userProductsController = require("../controllers/user-products.controller");

router.get("/", userProductsController.findAll);
router.get("/:username", userProductsController.findOne);
router.post("/", userProductsController.addProduct);
router.patch("/:username", userProductsController.updateProduct);
router.delete("/:username/:product", userProductsController.deleteProduct);
router.get("/stats1", userProductsController.stats1);

module.exports = router;
