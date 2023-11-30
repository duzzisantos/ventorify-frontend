export const generateRevenue = (data) => {
  return data
    .map((element) => {
      const { unitPrice, salesOperations } = element;
      return unitPrice * salesOperations.quantitySold;
    })
    .reduce((acc, curr) => acc + curr, 0);
};
