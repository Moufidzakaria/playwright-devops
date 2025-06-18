import { test, expect } from "@playwright/test";

test("Gérer les fenêtres / onglets dans Playwright", async ({ browser }) => {
  // Créer un nouveau contexte (utile pour gérer des sessions isolées)
  const context = await browser.newContext();

  // Ouvrir une nouvelle page
  const page = await context.newPage();

  // Aller sur la page de login
  await page.goto("https://freelance-learn-automation.vercel.app/login");

  // Attendre que le lien soit visible (bon pour la stabilité)
  const termsLink = page.locator("//a[contains(@href, 'facebook')][1]");
  await expect(termsLink).toBeVisible();

  // Intercepter l'ouverture d'une nouvelle page (nouvel onglet ou popup)
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // attend qu’une nouvelle page s’ouvre
    termsLink.click(),            // déclenche le clic sur le lien
  ]);

  // Attendre que la nouvelle page charge du contenu
  await newPage.waitForLoadState();

  // Afficher l'URL de la nouvelle page dans la console (utile pour le debug)
  console.log("Nouvelle page ouverte :", newPage.url());

  // Vérifier que la nouvelle page contient un élément attendu (par exemple titre)
  expect(newPage.url()).toContain("facebook");

  // Fermer les pages
  await newPage.close();
  await page.close();
});
