const Orders = require("../models/send-order-confirmation");
const multer = require("multer");
const upload = multer();

exports.sendOrderConfirmation = async (req, res) => {
  if (!req.body) {
    console.log("Request body cannot be empty");
  }

  const confirmation = new Orders({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    customerOrderAsPDF: req.file.buffer,
  });
};
