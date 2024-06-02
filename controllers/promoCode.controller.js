const pool = require("../models/postgresql");

const getPromoCodeData=async (req, res, next) => {
    try {
      const { code } = req.params;
      const promoCodeResult = await pool.query(
        "SELECT * FROM code_promo WHERE code=$1",
        [`${code}`]
      );
      if (promoCodeResult.rows.length == 0) {
        res.json({ status: false, msg: "le code promo est invalide" });
      } else {
        const promoCodeExpirationDate = new Date(
          promoCodeResult.rows[0].expiration_date.toString()
        );
        if (new Date() > promoCodeExpirationDate) {
          return res.json({ status: false, msg: "le code promo est expiré" });
        } else {
          return res.json({
            status: true,
            promoCodeDetails: promoCodeResult.rows[0],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

// get product by name 
module.exports={
    getPromoCodeData:getPromoCodeData
}