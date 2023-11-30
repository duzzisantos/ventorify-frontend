export const getTopStowedProduct = (element, selectedMonth, selectedYear) => {
  const productName = {};
  element.stowingHistory
    .filter(
      (item) => item.year === selectedYear && item.month === selectedMonth
    )
    .map((file) => file.topStowedProducts)
    .forEach((product) =>
      productName[product]
        ? (productName[product] += 1)
        : (productName[product] = 1)
    );
  return Object.keys(productName).sort(
    (prev, next) => productName[next] - productName[prev]
  )[0];
};
