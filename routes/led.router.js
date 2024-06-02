const router = require("express").Router();

// postal code controller
const ledController = require("../controllers/led.controller");

router.post("/led", ledController.ledservice);

module.exports = router;
