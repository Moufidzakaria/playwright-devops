import {expect, test} from "@playwright/test"

test("upload" , async function ({page}) {
    await page.goto("https://the-internet.herokuapp.com/upload")

    await page.locator("#file-upload").setInputFiles("/home/zakaria/Desktop/instelec/React-Landing-Page-Template/public/img/portfolio/01-large.jpg")

    await page.locator("#file-upload").click()

    expect(await page.locator("//h3")).toHaveText("File Uploaded!")
})