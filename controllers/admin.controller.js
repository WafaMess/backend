const pool= require("../models/postgresql")

const loginAdmin=async (req, res , next)=>{

    try {
        const {adminCode}=req.body
        const adminData=await pool.query(`select * from admin where code=$1`,[adminCode])
        if (adminData.rows.length == 0) {
            res.json({ status: false, msg: "le code admin est invalide" });
          } else {
            res.json({status:true, data:adminData.rows[0]})
          }
    } catch (error) {
        console.log(error)
        res.json({status:false, msg:"server error"})
    }
}

module.exports={
    loginAdmin:loginAdmin
}