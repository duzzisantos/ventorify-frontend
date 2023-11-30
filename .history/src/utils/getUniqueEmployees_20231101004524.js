export function getUniqueEmployees(data) {
  const uniqueEmployees = [
    ...new Set(data.map((element) => element.officerName)),
  ];

  const employeeActivity = uniqueEmployees.map((employee) => {
    const filteredEmployees = data
      .filter((item) => item.officerName === employee)
      .map((result) => result);
  });

  return employeeActivity;
}
