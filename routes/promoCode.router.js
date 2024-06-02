const router=require("express").Router()

// promo code controller
const promoCodeController=require("../controllers/promoCode.controller")

router.get("/promo_code/:code", promoCodeController.getPromoCodeData);


module.exports=router