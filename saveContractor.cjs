const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const filePath = path.join(__dirname, "contractors.xlsx");

function saveContractorData({ name, company, email }) {
  const sheetName = "Contractors";
  let data = [["Name", "Company", "Email"]]; // Header por defecto

  let workbook;

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);

    if (workbook.SheetNames.includes(sheetName)) {
      const worksheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  // Agregar nueva fila
  data.push([name, company, email]);

  // Crear nueva hoja
  const newWorksheet = XLSX.utils.aoa_to_sheet(data);

  // Limpiar todas las hojas (opcional, para evitar que Excel cree Contractors1, etc.)
  workbook.SheetNames.forEach(name => delete workbook.Sheets[name]);
  workbook.SheetNames = [];

  // Agregar solo una hoja con el nombre correcto
  workbook.SheetNames.push(sheetName);
  workbook.Sheets[sheetName] = newWorksheet;

  // Guardar
  XLSX.writeFile(workbook, filePath);
}

module.exports = saveContractorData;