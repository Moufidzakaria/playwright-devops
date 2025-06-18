import {test} from "@playwright/test"

test("moushover" , async function ({page}) {
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    await page.getByPlaceholder("Enter Email").type("admin@email.com")

    await page.getByPlaceholder("Enter Password").type("admin@123")

    await page.getByRole("button" , {name: "Sign in"}).click()
})