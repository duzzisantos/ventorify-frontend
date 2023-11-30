export const getProductEOQ = (product) => {
  for (const item of product) {
    for (const element of Object.values(item.components)) {
      switch (element) {
        case "Milk":
          return 500;
        case "Cheese":
          return 450;
        case "Butter Milk":
          return 400;
        default:
          return 210;
      }
    }
  }
};
