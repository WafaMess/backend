const router = require("express").Router();
const productController = require("../controllers/productCod.controller");

// Rechercher un produit par code-barres
router.get("/codebare/:codebare", productController.getProductByBarcode);

module.exports = router;
