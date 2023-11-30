export function getUniqueEmployees(data) {
  const uniqueEmployees = [
    ...new Set(data.map((element) => element.officerName)),
  ];

  uniqueEmployees.map((employee) => {
    const filteredEmployees = data
      .filter((element) => element.officerName === employee)
      .map((item) => item);

    return filteredEmployees;
  });
}
