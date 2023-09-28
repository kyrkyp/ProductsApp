const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");

const app = express();
const port = 3000;

const user = require("./routes/user.route");
const products = require("./routes/products.route");
const user_products = require("./routes/user-products.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connected to database");
  },
  (err) => {
    console.log("Error connecting to database");
  }
);

app.use(
  cors({
    origin: "*",
    // origin: ["http://www.example.com", "http://localhost:8000"],
  })
);

app.use("/", express.static("files"));

app.use("/api/users", user);
// app.use("/api/products", products);
app.use("/api/user-products", user_products);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
