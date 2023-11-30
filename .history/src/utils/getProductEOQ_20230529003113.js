export const getProductEOQ = (product) => {
  for (const item of product) {
    for (const element of Object.values(item.components)) {
      switch (element) {
        case "Milk":
          return 500;
          break;

        case "Cheese":
          return 450;
          break;

        default:
          return 210;
      }
    }
  }
};
