export //filters out errors due to negative numbers. Only positive integers are allowed
const getRemainingGoods = (element) => {
  const quantityAsInteger = Number(quantity[element.product]);
  if (element.totalProductCount && quantityAsInteger) {
    if (quantityAsInteger <= 0) {
      return element.totalProductCount;
    } else if (quantityAsInteger > 0) {
      return element.totalProductCount - quantityAsInteger;
    }
  }
};
