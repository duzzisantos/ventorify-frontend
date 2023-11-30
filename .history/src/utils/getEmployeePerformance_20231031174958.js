function getEmployeePerformance(data, month, year) {
  const result = [];
  data.forEach((item) => {
    if (
      month === new Date(item.updatedAt).getMonth() &&
      year === new Date(item.updatedAt).getFullYear()
    ) {
      result.push({
        stowingRecord: [...item.batchAmount],
        productsStowed: [...item.product],
      });
    }
  });
  return result;
}

export default getEmployeePerformance;
