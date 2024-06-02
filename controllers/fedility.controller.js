const pool = require("../models/postgresql");

const getFedilityAccountData = async (req, res, next) => {
  try {
    const { code } = req.params;
    const comptFideliteResult = await pool.query(
      "SELECT * FROM compt_fidelite WHERE code=$1",
      [`${code}`]
    );
    if (comptFideliteResult.rows.length == 0) {
      res.json({ status: false, msg: "le code est invalide" });
    } else {
      res.json({ status: true, data: comptFideliteResult.rows[0] });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFedilityAccountData: getFedilityAccountData,
};
