import {expect, test} from "@playwright/test"

test("verify error message" , async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await page.getByPlaceholder("Username").type("Admin")

    await page.getByPlaceholder("Password").type("adminads")

    await page.locator("//button[normalize-space-()='Login']").click()

    const ErrorMessage =   await page.locator("//p[contains(@class , 'alert-content-text')]").textContent()

    console.log("Error message" + ErrorMessage)

    expect(ErrorMessage?.includes("invalid")).toBeTruthy()
})