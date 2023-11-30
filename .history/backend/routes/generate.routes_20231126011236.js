const sales = require("../controllers/generateOrders");
var router = require("express").Router();
router.get("/:customer", sales.generateOrderSummary);

module.exports = router;
