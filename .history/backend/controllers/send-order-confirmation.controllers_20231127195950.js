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

exports.getOrderConfirmation = async (req, res) => {
  const id = req.query.id;
  var condition = id ? { $regex: new RegExp(id), $options: "gi" } : {};
  Orders.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.confirmCustomerPayment = (req, res) => {
  const id = req.params.id;
  Orders.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (!data) {
      return next(err);
    } else {
      res.status(200).json({ message: "Customer has paid" });
    }
  });
};
