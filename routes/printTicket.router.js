const router = require("express").Router();
const printTicketController = require("../controllers/printTicket.controller");

// Endpoint pour l'impression d'un ticket
router.post("/print", printTicketController.printTicket);

module.exports = router;
