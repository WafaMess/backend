const pool = require("../models/postgresql");

const getProductByName=async (req, res, next) => {
    try {
      const { nom } = req.params;
      const productsResult = await pool.query(
        "SELECT * FROM produit WHERE nompr ILIKE $1",
        [`${nom}%`]
      );
      const catergorieResult = await pool.query(
        "SELECT codfamille as name FROM produit WHERE nompr ILIKE $1 GROUP BY codfamille",
        [`${nom}%`]
      );
      res.json({
        status: true,
        productList: productsResult.rows,
        categorieList: catergorieResult.rows,
      });
    } catch (error) {
      console.log(error);
    }
  }

// get product by name 
module.exports={
    getProductByName:getProductByName
}