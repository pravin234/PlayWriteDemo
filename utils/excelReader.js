import xlsx from "xlsx";

/**
 * Reads data from an Excel file and returns it as an array of objects.
 * @param {string} filePath - The path to the Excel file.
 * @param {string} sheetName - The name of the sheet to read.
 * @returns {Array} - Array of objects representing rows in the Excel sheet.
 */
export function readExcelData(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath); // Load the workbook
  const sheet = workbook.Sheets[sheetName]; // Get the desired sheet
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
  }
  return xlsx.utils.sheet_to_json(sheet); // Convert sheet to JSON
}
