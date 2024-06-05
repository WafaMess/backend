const pool = require("../models/postgresql");

const getProductByBarcode = async (req, res, next) => {
  try {
    const { codebare } = req.params;
    const productResult = await pool.query(
      "SELECT * FROM produit WHERE codebare = $1",
      [codebare]
    );
    if (productResult.rows.length > 0) {
      res.json({
        status: true,
        product: productResult.rows[0],
      });
    } else {
      res.json({
        status: false,
        message: "Produit non trouvé",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  getProductByBarcode,
};
