async (page) => {
  await page.goto('https://whois.publicissapient.fr');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(3000);
  await page.goto('https://whois.publicissapient.fr');
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Play!' }).first().click();
  await page.getByTestId('button-0').click();
  await page.getByTestId('button-0').click();
  await page.getByTestId('button-0').click();
  await page.getByTestId('button-0').click();
  await page.getByTestId('button-0').click();
  await page.getByRole('button', { name: 'Game summary' }).click();
  await page.locator('.absolute').first().click();
  await page.getByRole('button').nth(1).click();
};
