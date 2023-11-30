const Price = require("../models/price-list");

//Create new instances of product prices
exports.createPriceList = async (req, res) => {
  if (!req.body.product) {
    res.send({ message: "Body cannot be empty" });
    return;
  }

  const priceList = new Price({
    product: req.body.product,
    category: req.body.category,
    unitPrice: req.body.unitprice,
  });

  priceList
    .save(priceList)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Update price list based on current market prices or any special offering
