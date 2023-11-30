const Shelf = require("../models/shelf");
const WareHouse = require("../models/warehouse");

//Warehouse flow method. //Refactor this please!!!
class Operate {
  constructor(wareHouseData, shopshelf) {
    this.getWarehouse = () => {
      return wareHouseData;
    };

    this.getShopItems = () => {
      return shopshelf;
    };

    this.clearWarehouse = () => {
      wareHouseData = [];
    };

    //Transfers items from warehouse shelf to store shelf
    this.fromShelfToStore = async (id) => {
      const shelfItem = await this.getWarehouse().find(
        (element) => element.id === id
      );
      await this.getShopItems().push(shelfItem);
      //function used to filter found item from the original array - based on it's first matching index
      const deleteFoundItem = (value, index, arr) => {
        if (value === shelfItem) {
          arr.splice(index, 1);
          return true;
        }
        return false;
      };
      await this.getWarehouse().filter(deleteFoundItem);
    };

    this.disposeDefectedItem = async (id) => {
      const defectedItem = await this.getWarehouse().find(
        (item) => item.id === id
      );
      await this.getWarehouse().filter((element) => element !== defectedItem);
    };

    this.sendBackToWarehouse = async (productName, productCategory) => {
      const surplus = await this.getWarehouse().findLast(
        (element) =>
          element.product_category === productCategory &&
          element.product_name === productName
      );

      //Assigns a special label to returned inventory
      surplus.specialStatus = "Returned";
      await this.showReceivedGoods().shift(surplus);

      const deleteFoundItem = (value, index, arr) => {
        if (value === surplus) {
          arr.splice(index, 1);
          return true;
        }
        return false;
      };

      await this.getWarehouse().filter(deleteFoundItem);
      return this.getWarehouse();
    };
  }
}

exports.find = async (req, res) => {
  try {
    const warehouseData = await WareHouse.find();
    const shelfData = await Shelf.find();
    const method = new Operate(warehouseData, shelfData);
    const id = req.params.id;
    const foundData = method.fromShelfToStore(id);
    console.log(foundData);
    return foundData;
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteAll = (req, res) => {
  Shelf.deleteMany({})
    .then((data) => {
      res.status(200).json({
        message: "Successfully deleted collection",
      });
      console.log(data, "All these data have been wiped from the collection");
    })
    .catch((err) => {
      console.log(err);
    });
};
