function getUniqueEmployees(data) {
  const uniqueEmployees = [
    ...new Set(data.map((element) => element.officerName)),
  ];
}
