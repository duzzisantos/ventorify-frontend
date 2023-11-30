const getEmployeeActivity = (getUniqueEmployees, warehouse) => {
  //Al results must be a collection of unique employee activity history for each employee on the list
  const result = [];
  getUniqueEmployees(warehouse).forEach((employee) => {
    //Get all aggregate performance metrics for each employee
    const employeeStowingHistory = Object.values(employee).map((item) => ({
      year: new Date(item.firstEntryDate).getFullYear().toString(),
      month: (new Date(item.firstEntryDate).getMonth() + 1).toString(),
      stowedAmount: item.batchAmount,
      topStowedProducts: item.product,
    }));

    //Get unique employee names
    const uniqueEmployeeNames = [
      ...new Set(Object.values(employee).map((item) => item.officerName)),
    ].join("");

    result.push({
      employeeName: uniqueEmployeeNames,
      stowingHistory: employeeStowingHistory,
    });
  });
  return result;
};

export default getEmployeeActivity;
