import { test, expect } from "@playwright/test";

test("Test dropdowns - State and Hobbies selection", async ({ page }) => {
  await page.goto("https://freelance-learn-automation.vercel.app/signup");

  // --- Dropdown "state" ---
  const stateDropdown = page.locator("#state");
  await stateDropdown.selectOption({ label: "Goa" });
  await stateDropdown.selectOption({ label: "Bihar" });

  const stateOptions = await stateDropdown.locator("option").all();
  console.log("Liste des États disponibles :");
  for (const option of stateOptions) {
    const value = await option.textContent();
    console.log(`- ${value?.trim()}`);
  }

  const selectedState = await stateDropdown.inputValue();
  expect(selectedState).toBe("Bihar");

  // --- Dropdown "hobbies" (multiple) ---
  const hobbiesDropdown = page.locator("#hobbies");
  await hobbiesDropdown.selectOption([{ label: "Playing" }, { label: "Swimming" }]);

  const hobbiesOptions = await hobbiesDropdown.locator("option").all();
  console.log("\nListe des hobbies disponibles :");
  for (const option of hobbiesOptions) {
    const value = await option.textContent();
    console.log(`- ${value?.trim()}`);
  }

  const selectedHobbies = await hobbiesDropdown.evaluate((select) =>
    Array.from(select.selectedOptions).map((opt) => opt.value)
  );
  console.log("\nHobbies sélectionnés :", selectedHobbies);

  // ✅ Correction : on vérifie les `value`, pas les `label`
  expect(selectedHobbies).toEqual(expect.arrayContaining(["playing", "swimming"]));

  await page.waitForTimeout(2000);
  await page.close();
});
