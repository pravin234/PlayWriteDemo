import { test, expect } from "@playwright/test";

// Reusable helper functions
const login = async (page, username, password) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("link", { name: "PIM" })).toBeVisible(); // Ensure login was successful
};

const addEmployee = async (page, firstName, middleName, lastName) => {
  await page.getByRole("link", { name: "PIM" }).click();
  await page.getByRole("button", { name: " Add" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill(firstName);
  await page.getByRole("textbox", { name: "Middle Name" }).fill(middleName);
  await page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
  await page.getByRole("button", { name: "Save" }).click();
};

const selectDropdownOption = async (
  page,
  dropdownLabel,
  optionText,
  index = 0
) => {
  // Narrow the selection to the desired dropdown using nth() or additional filters
  const dropdowns = await page.locator(`text="${dropdownLabel}"`);
  const dropdown = dropdowns.nth(index); // Use index to resolve strict mode issues
  await dropdown.click();
  const option = await page.locator(`text="${optionText}"`);
  await option.click();
};

const searchEmployeeById = async (page, id) => {
  await page.getByRole("textbox").nth(2).fill(id);
  await page.getByRole("button", { name: "Search" }).click();
};

const logout = async (page) => {
  await page.getByRole("menuitem", { name: "Logout" }).click();
};

// Test Script
test("OrangeHRM Employee Management Test", async ({ page }) => {
  // Login to the application
  await login(page, "Admin", "admin123");

  // Add a new employee
  await addEmployee(page, "Nilesh", "Rajendra", "Shelke");

  // Select gender and other options
  await selectDropdownOption(page, "-- Select --", "Freelance", 0); // Specify the index to avoid strict mode issues
  await page.getByText("Male").locator("span").click();
  await page.getByRole("button", { name: "Save" }).click();

  // Search for the employee by ID
  await searchEmployeeById(page, "379");

  // Perform additional actions like filtering and updating employee details
  await selectDropdownOption(page, "-- Select --", "Indian", 1); // Adjust the index based on dropdown location
  await selectDropdownOption(page, "-- Select --", "Married", 2);

  // Set the date of birth
  await page.locator("div:has-text('Date of Birth') i").click();
  await page.getByText("1992").click();
  await page.getByText("April").click();
  await page.getByText("23").click();
  await page.getByRole("button", { name: "Save" }).click();

  // Logout of the application
  await logout(page);
});
