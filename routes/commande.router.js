const router=require("express").Router()

// commande controller
const commandeController=require("../controllers/commande.controller")


// add commande
router.post("/commande",commandeController.addCommande)
module.exports=router