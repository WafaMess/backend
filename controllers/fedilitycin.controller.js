const pool = require("../models/postgresql");

const getFedilityAccountDataByCIN = async (req, res, next) => {
  try {
    const { numcin } = req.params;
    const fidelityResult = await pool.query(
      "SELECT * FROM compt_fidelite WHERE numcin=$1",
      [`${numcin}`]
    );
    if (fidelityResult.rows.length == 0) {
      res.json({
        status: false,
        msg: "le numéro de carte d'identité est invalide",
      });
    } else {
      res.json({ status: true, data: fidelityResult.rows[0] });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFedilityAccountDataByCIN: getFedilityAccountDataByCIN,
};
