import {test} from "@playwright/test"


test("keyboaed" , async function ({page}) {

    await page.goto("https://www.google.com")

    await page.locator("textarea[name='q']").type("Mukesh otwani")

    await page.keyboard.press("Meta+A")

})