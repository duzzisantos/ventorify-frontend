export class Operate {
  constructor(receivedGoods, wareHouseData, reserveData, shopshelf) {
    this.showReceivedGoods = () => {
      return receivedGoods;
    };

    this.getWarehouse = () => {
      return wareHouseData;
    };

    this.getReservedData = () => {
      return reserveData;
    };

    this.getShopItems = () => {
      return shopshelf;
    };

    this.clearWarehouse = () => {
      wareHouseData = [];
    };

    this.shelfItem = async (productName, productCategory) => {
      const found = await this.showReceivedGoods().find(
        (element) =>
          element.product_name === productName &&
          element.product_category === productCategory
      );
      await this.getWarehouse().push(found);
      //function used to filter found item from the original array - based on it's first matching index
      const deleteFoundItem = (value, index, arr) => {
        if (value === found) {
          arr.splice(index, 1);
          return true;
        }
        return false;
      };

      await this.showReceivedGoods().filter(deleteFoundItem);
      return this.getWarehouse();
    };

    this.fromShelfToStore = async (productName, productCategory) => {
      const shelfItem = await this.getWarehouse().find(
        (element) =>
          element.product_name === productName &&
          element.product_category === productCategory
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
      return this.getShopItems();
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
