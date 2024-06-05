const router = require("express").Router();
const printController = require("../controllers/print.controller");

// Route pour imprimer un ticket
router.post("/print-ticket", printController.printTicket);

module.exports = router;
