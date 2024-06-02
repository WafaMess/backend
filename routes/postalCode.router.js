const router=require("express").Router()


// postal code controller
const postalCodeController=require("../controllers/postalCode.controller")

router.post("/postal_code",postalCodeController.addPostCode)


module.exports=router;