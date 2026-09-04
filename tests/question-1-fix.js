test('submit form', async ({ page }) => {

    await page.goto(baseURL + '/form'); //Fix 4
    await page.getByLabel('Name').fill('John'); //Fix 1
    await page.getByRole('button', { name: 'Submit'}).click(); //Fix 2
    const successMessage = page.locator('.success-message'); //toaster
    await expect(successMessage).toHaveText('Form submitted'); //Fix 3
});