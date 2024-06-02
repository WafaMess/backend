// admin controller
const adminController=require("../controllers/admin.controller")
const router=require("express").Router()

// login admin
router.post("/admin",adminController.loginAdmin)
module.exports=router;