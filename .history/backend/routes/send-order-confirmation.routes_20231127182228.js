module.exports = (app) => {
  const confirmation = require("../controllers/send-order-confirmation.controllers");
  var router = require("express").Router();
  const multer = require("multer");
  const upload = multer();
  router.post(
    "/",
    upload.single("orderAsPDF"),
    confirmation.sendOrderConfirmation
  );
  app.use("/api/customer-order", router);
};
