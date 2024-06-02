const pool = require("../models/postgresql");

const addCommande=async (req, res, next)=>{
    try {
      console.log(req.body)
      const {total, products} = req.body;
      const addCommande = await pool.query(
        "INSERT INTO commandes (total, products) values ($1,$2)",
        [Number(total).toFixed(2) , {"data":products} ]
      );
     
      res.json({status:true, msg:"commande has been added"})
    } catch (error) {
      res.json({status:false, msg:"error while commande adding"})
  
      console.log(error);
    }
  }

// get product by name 
module.exports={
    addCommande:addCommande
}