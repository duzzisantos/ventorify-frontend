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
        case "Yoghurt":
          return 500;
        case "Kefir":
          return 250;
        case "Butter":
          return 500;
        case "Ice Cream":
          return 400;
        case "Beef":
          return 650;
        case "Pork":
          return 500;
        case "Turkey":
          return 250;
        case "Chicken":
          return 600;
        case "Fish":
          return 500;
        default:
          return 210;
      }
    }
  }
};
