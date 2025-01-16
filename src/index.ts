import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());

import productController from "./product/product.controller";
import orderController from "./order/presentation/order.controller";

app.use("/api/products", productController);
app.use("/api/orders", orderController);

app.listen("3010", () => {
  console.log("App started");
});