import {test} from "@playwright/test"

test("Verify application" , async function({page}) {
    await page.goto("https://www.google.com")

    await page.locator("textarea[name='q']").type("Playwright")

    await page.waitForSelector("//li[@role='presentation']")

    const elements = await page.$$("//li[@role='presentation']")

    for(let i=0 ; i<elements.length ; i++) {
        const text = await elements[i].textContent()

        if(text?.includes("youtube")) {
            await elements[i].click()
            break
        }
    }
})