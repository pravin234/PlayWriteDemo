import { test, expect } from "@playwright/test";
import path from "path";

// Path to your Excel file
const excelFilePath = path.resolve(__dirname, "test-data.xlsx");
const sheetName = "Sheet1"; // Replace with your sheet name

test("Login Test with Excel Data", async ({ page }) => {
  // Read data from the Excel file
  const excelData = readExcelData(excelFilePath, sheetName);

  // Loop through each row in the Excel data
  for (const row of excelData) {
    const { username, password } = row; // Ensure your Excel columns have these headers
    console.log(`Testing with username: ${username}, password: ${password}`);

    // Navigate to the login page
    await page.goto("https://example.com/login");

    // Enter username
    await page.fill("#username", username);

    // Enter password
    await page.fill("#password", password);

    // Click the login button
    await page.click("#loginButton");

    // Validate login success (adjust as needed for your app)
    await expect(page).toHaveURL("https://example.com/dashboard");
    console.log(`Login successful for user: ${username}`);

    // Log out after the test (if needed)
    await page.click("#logoutButton");
  }
});
