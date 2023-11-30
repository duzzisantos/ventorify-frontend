const ShelfSchema = require("../models/shelf");
const AggregateShelfItems = require("../models/aggregate-shelf-model");
const AggregateGoods = require("../models/aggregate-model");
exports.aggregateShelfItems = async (req, res) => {
  const id = req.query.id;
  var condition = id ? { $regex: new RegExp(id), $options: "gi" } : {};
  try {
    const result = await ShelfSchema.find(condition);
    const products = [...new Set(result.map((element) => element.product))];
    const groupedProducts = products.map((product) => {
      const filteredProducts = result
        .filter((item) => item.product.includes(product))
        .map((list) => list);

      const totalProductCount = filteredProducts
        .map((count) => count.batchAmount)
        .reduce((prev, next) => prev + next, 0);

      const category = Array.from(
        new Set(filteredProducts.map((item) => item.category))
      ).join("");

      const economicOrderQuantity = Number(
        Array.from(
          new Set(filteredProducts.map((item) => item.economicOQ))
        ).join("")
      );

      return { product, totalProductCount, category, economicOrderQuantity };
    });
    async function aggregatize() {
      try {
        const result = await AggregateShelfItems.insertMany(groupedProducts);
        res.send(result);
      } catch (err) {
        console.error(err.message);
      }
    }

    //callback the aggregation function
    aggregatize();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.transferAggregateGoodsToShelf = async (req, res) => {
  const itemId = req.params.id;
  try {
    const data = await AggregateGoods.findById(itemId);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Aggregate goods not found in warehouse" });
    }

    const toShelf = new AggregateShelfItems({
      product: data.product,
      category: data.category,
      economicOrderQuantity: data.economicOrderQuantity,
      totalProductCount: data.totalProductCount,
    });

    await toShelf.save();

    await AggregateGoods.findByIdAndRemove(itemId);

    return res
      .status(200)
      .json({ message: "Successfully transferred aggregated goods to shelf" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
