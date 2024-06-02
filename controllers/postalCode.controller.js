const pool = require("../models/postgresql");

const addPostCode=async (req, res, next)=>{
    try {
      console.log(req.body)
      const {codePostal} = req.body;
      const addCommande = await pool.query(
        "INSERT INTO code_postal (code) values ($1)",
        [ codePostal ]
      );
     
      res.json({status:true, msg:"code postal has been added"})
    } catch (error) {
      res.json({status:false, msg:"error while postal code adding"})
  
      console.log(error);
    }
  }

// get product by name 
module.exports={
    addPostCode:addPostCode
}