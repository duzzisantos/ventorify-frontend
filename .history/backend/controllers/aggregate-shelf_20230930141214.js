const AggregateShelfItems = require("../models/aggregate-shelf-model");

exports.aggregateShelfItems = async (req, res) => {
  const id = req.query.id;
  var condition = id ? { $regex: new RegExp(id), $options: "gi" } : {};
  AggregateShelfItems.find(condition)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No items found in shelf" });
      } else {
        res.status(200).json({ message: "Aggregate goods found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // try {
  //   const result = await ShelfSchema.find(condition);
  //   const products = [...new Set(result.map((element) => element.product))];
  //   const groupedProducts = products.map((product) => {
  //     const filteredProducts = result
  //       .filter((item) => item.product.includes(product))
  //       .map((list) => list);

  //     const totalProductCount = filteredProducts
  //       .map((count) => count.batchAmount)
  //       .reduce((prev, next) => prev + next, 0);

  //     const category = Array.from(
  //       new Set(filteredProducts.map((item) => item.category))
  //     ).join("");

  //     const economicOrderQuantity = Number(
  //       Array.from(
  //         new Set(filteredProducts.map((item) => item.economicOQ))
  //       ).join("")
  //     );

  //     return { product, totalProductCount, category, economicOrderQuantity };
  //   });
  //   async function aggregatize() {
  //     try {
  //       const result = await AggregateShelfItems.insertMany(groupedProducts);
  //       res.send(result);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   }

  //   //callback the aggregation function
  //   aggregatize();
  // } catch (err) {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
};
