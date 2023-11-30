export function getUniqueEmployees(data) {
  const uniqueEmployees = [
    ...new Set(data.map((element) => element.officerName)),
  ];

  const employeeActivity = data
    .filter((item) => uniqueEmployees.includes(item.officerName))
    .map((element) => element);
}
