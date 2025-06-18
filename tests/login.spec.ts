import {expect, test} from "@playwright/test"

test("login test" , async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await page.getByPlaceholder("Username").type("Admin")

    await page.getByPlaceholder("Password").type("admin123")

    await page.locator("//button[@type='submit']").click()

    await expect(page).toHaveURL(/dashboard/)

    await page.getByAltText("profile picture").first().click()

    await page.getByText("Logout").click()

    await expect(page).toHaveURL(/login/)
})