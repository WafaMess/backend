const {
  BreakLine,
  CharacterSet,
  PrinterTypes,
  ThermalPrinter,
} = require("node-thermal-printer");

const printTicket = async (req, res) => {
  const commande = req.body;

  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: "tcp://192.168.2.215",
    width: 42,
    lineCharacter: "-",
    breakLine: BreakLine.WORD,
    characterSet: CharacterSet.PC852_LATIN2,
    removeSpecialCharacters: false,
  });

  const connect = printer.isPrinterConnected();
  console.log(connect);

  if (!connect) {
    console.error("Printer not connected");
    return res.status(500).send("Printer not connected");
  }

  printer.alignCenter();
  printer.println("AURES Groupe");
  printer.newLine();
  printer.code128(`${commande.id}`);
  printer.newLine();
  printer.alignLeft();
  printer.println(`Ticket n°${commande.id} du ${commande.dateCommande}`);
  printer.println(`Caisse : ${commande.bornID}`);
  printer.println(`Client : ${commande.client_id}`);
  printer.newLine();
  printer.tableCustom([
    { text: "Article", align: "LEFT", width: 0.5 },
    { text: "Qté", align: "CENTER", width: 0.2 },
    { text: "Prix", align: "RIGHT", width: 0.3 },
  ]);
  printer.drawLine();

  let nbrProd = 0;
  const len = commande.Products.length;
  for (let i = 0; i < len; i++) {
    printer.tableCustom([
      { text: `${commande.Products[i].name}`, align: "LEFT", width: 0.5 },
      { text: `${commande.Products[i].qte}`, align: "CENTER", width: 0.2 },
      {
        text: `${commande.Products[i].totalPriceProd}`,
        align: "RIGHT",
        width: 0.3,
      },
    ]);
    nbrProd += commande.Products[i].qte;
  }

  printer.newLine();
  printer.drawLine();
  printer.newLine();
  printer.leftRight("Nombres d'articles", `${nbrProd}`);
  printer.leftRight("Total en Euro", `${commande.totalPrice}`);
  printer.newLine();
  printer.drawLine();
  printer.newLine();
  printer.alignCenter();
  printer.println("THANK YOU");

  printer.cut();

  try {
    const execute = await printer.execute();
    console.log("Print successful:", execute);
    res.status(200).send("Print successful");
  } catch (error) {
    console.error("Failed to print:", error);
    res.status(500).send("Failed to print");
  }

  printer.clear();
};

module.exports = {
  printTicket,
};
