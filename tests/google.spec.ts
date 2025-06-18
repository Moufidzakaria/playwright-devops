import {test} from "@playwright/test"

test("google " , async ({page}) => {
    await page.goto("https://www.google.com/?hl=fr")

    const url = await page.url()
    console.log("Title" + url)

})