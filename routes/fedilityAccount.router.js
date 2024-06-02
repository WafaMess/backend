const router = require("express").Router();

// fedility controller
const fedilityController = require("../controllers/fedility.controller");

const fedilityCinController = require("../controllers/fedilitycin.controller");
// get compt fidelite by Code
router.get("/compt_fidelite/:code", fedilityController.getFedilityAccountData);

// get compt fidelite by numcin

router.get(
  "/compt_fidelite/:numcin",
  fedilityCinController.getFedilityAccountDataByCIN
);

module.exports = router;
