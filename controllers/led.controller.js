const pool = require("../models/postgresql");
const { SerialPort } = require("serialport");

const RazLedGreen = [0x02, 0x1b, 0x20, 0x00, 0x03];
const RazLedRed = [0x02, 0x1b, 0x21, 0x00, 0x03];
const RazLedOrange = [0x02, 0x1b, 0x22, 0x00, 0x03];

const GreenColorLed = [0x02, 0x1b, 0x20, 0xc0, 0x03];
const RedColorLed = [0x02, 0x1b, 0x21, 0xc0, 0x03];
const OrangeColorLed = [0x02, 0x1b, 0x22, 0xc0, 0x03];

const ledservice = async (req, res, next) => {
  const port = new SerialPort({ path: "COM3", baudRate: 9600 });

  const { color } = req.body;
  let colorCode;

  switch (color) {
    case "green":
      coloorCde = GreenColorLed;
      break;
    case "red":
      colorCode = RedColorLed;
      break;
    case "orange":
      colorCode = OrangeColorLed;
      break;
    case "greenoff":
      colorCode = RazLedGreen;
      break;
    case "redoff":
      colorCode = RazLedRed;
      break;
    case "orangeoff":
      colorCode = RazLedOrange;
      break;
    default:
      return res.status(400).send("Invalid color");
  }

  try {
    await ledLight(colorCode);
    res.send("LED turned on");
  } catch (error) {
    res.status(500).send("Error turning on the LED");
  }

  async function ledLight(colorCode) {
    return new Promise((resolve, reject) => {
      port.open((error) => {
        if (error) {
          console.log("error opening the port:", error.message);
          return reject(error);
        } else {
          console.log("the port opened:");
        }
      });

      port.on("open", () => {
        console.log(`color number[] ${colorCode}`);
        port.write(colorCode, (error) => {
          if (error) {
            console.log("error writing to port:", error.message);
            return reject(error);
          } else {
            console.log("writing to port succeeded");
            port.close((err) => {
              if (err) {
                console.error("Error closing serial port:", err.message);
                return reject(err);
              } else {
                console.log("Serial port closed.");
                resolve();
              }
            });
          }
        });
      });

      port.on("error", function (err) {
        console.log("Error: ", err.message);
        reject(err);
      });
    });
  }
};

module.exports = {
  ledservice: ledservice,
};
