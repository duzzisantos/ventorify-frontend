//Switch between product names and return their Economic order quantities dynamically

export const getProductEOQ = (product) => {
  switch (product) {
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
    case "Duck":
      return 230;
    case "Sausage":
      return 400;
    case "Rice":
      return 650;
    case "Bread":
      return 600;
    case "Nutmeg":
      return 200;
    case "Spaghetti":
      return 550;
    case "Macaroni":
      return 450;
    case "Cornflakes":
      return 300;
    case "Flour":
      return 350;
    case "Wine":
      return 250;
    case "Malt":
      return 350;
    case "Pepsi":
      return 450;
    case "Cranberry juice":
      return 300;
    case "Beer":
      return 450;
    case "Orange juice":
      return 500;
    case "Coke":
      return 500;
    case "After shave":
      return 150;
    case "Pads":
      return 250;
    case "Shaving Stick":
      return 240;
    case "Cotton Wool":
      return 150;
    case "Shower Gel":
      return 250;
    case "Hair Oil":
      return 150;
    case "Toothpaste":
      return 150;
    default:
      return null;
  }
};
