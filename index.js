const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const server = require("http").createServer(app);

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pfe",
  password: "wafapostgres",
  port: 5432,
});
app.use(require("./routes/productCod.router"));
// product router
app.use(require("./routes/products.router"));
// promoCode router
app.use(require("./routes/promoCode.router"));
// fedility account router
app.use(require("./routes/fedilityAccount.router"));
// commande router
app.use(require("./routes/commande.router"));
// postal code router
app.use(require("./routes/postalCode.router"));
// admin router
app.use(require("./routes/admin.router"));
// led router
app.use(require("./routes/led.router"));
//print
app.use(require("./routes/print.routes"));
// get product By Name
// app.get("/products/:nom", async (req, res, next) => {
//   try {
//     const { nom } = req.params;
//     const productsResult = await pool.query(
//       "SELECT * FROM produit WHERE nompr ILIKE $1",
//       [`${nom}%`]
//     );
//     const catergorieResult = await pool.query(
//       "SELECT codfamille as name FROM produit WHERE nompr ILIKE $1 GROUP BY codfamille",
//       [`${nom}%`]
//     );
//     res.json({
//       status: true,
//       productList: productsResult.rows,
//       categorieList: catergorieResult.rows,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // get Promo Code
// app.get("/promo_code/:code", async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const promoCodeResult = await pool.query(
//       "SELECT * FROM code_promo WHERE code=$1",
//       [`${code}`]
//     );
//     if (promoCodeResult.rows.length == 0) {
//       res.json({ status: false, msg: "le code promo est invalide" });
//     } else {
//       const promoCodeExpirationDate = new Date(
//         promoCodeResult.rows[0].expiration_date.toString()
//       );
//       if (new Date() > promoCodeExpirationDate) {
//         return res.json({ status: false, msg: "le code promo est expiré" });
//       } else {
//         return res.json({
//           status: true,
//           promoCodeDetails: promoCodeResult.rows[0],
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//   // get compt fidelite by Code
//   app.get("/compt_fidelite/:code", async (req, res, next) => {
//     try {
//       const { code } = req.params;
//       const comptFideliteResult = await pool.query(
//         "SELECT * FROM compt_fidelite WHERE code=$1",
//         [`${code}`]
//       );
//       if (comptFideliteResult.rows.length == 0) {
//         res.json({ status: false, msg: "le code est invalide" });
//       } else {
//         res.json({status:true, data:comptFideliteResult.rows[0]})
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     });

// // add commande
// app.post("/commande",async (req, res, next)=>{
//   try {
//     console.log(req.body)
//     const {total, products} = req.body;
//     const addCommande = await pool.query(
//       "INSERT INTO commandes (total, products) values ($1,$2)",
//       [Number(total).toFixed(2) , {"data":products} ]
//     );

//     res.json({status:true, msg:"commande has been added"})
//   } catch (error) {
//     res.json({status:false, msg:"error while commande adding"})

//     console.log(error);
//   }
// })

const PORT = process.env.PORT || 3000;
server.listen(PORT, (_) => {
  console.log(`Server is running on PORT ${PORT}`);
});
