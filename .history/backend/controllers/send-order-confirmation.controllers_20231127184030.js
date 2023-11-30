const Orders = require("../models/send-order-confirmation");

exports.sendOrderConfirmation = async (req, res) => {
  if (!req.body) {
    console.log("Request body cannot be empty");
  }

  const confirmation = new Orders({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    customerOrderAsPDF: req.body.customerOrderAsPDF,
  });

  confirmation
    .save(confirmation)
    .then((data) => {
      data ? res.status(200) : res.status(500);
    })
    .catch((err) => {
      console.error(err);
    });
};
