const router=require("express").Router()

// controller
const productController=require("../controllers/product.conroller")


// get product By Name

router.get("/products/:nom", productController.getProductByName );
module.exports=router