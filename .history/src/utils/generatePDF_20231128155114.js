import jsPDF from "jspdf";
//Generates PDF file from backend api
const handleGeneratePDF = async (
  filteredData,
  customerName,
  generateRevenue
) => {
  const doc = new jsPDF();
  const header = ["Product", "Category", "UnitPrice", "Quantity", "Total"];
  const data = filteredData.map((element) => ({
    Product: element.product,
    Category: element.category,
    UnitPrice: element.unitPrice.toString(),
    Quantity: element.salesOperations.quantitySold.toString(),
    Total: element.salesOperations.revenue.toFixed(2).toString(),
  }));
  const config = {
    autoSize: true,
    printHeaders: true,
  };

  doc.setPage(1);
  doc.text(
    `Invoice for ${customerName} - Total: $ ${generateRevenue(filteredData)}`,
    10,
    7
  );
  doc.table(10, 10, data, header, config);
  doc.save();
};

export { handleGeneratePDF };
