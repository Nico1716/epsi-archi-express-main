import express from "express";
const router = express.Router();

router.get("", (request, response) => {
  response.send("Liste des produits !");
});

export default router;
