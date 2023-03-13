async (page) => {
  await page.goto('https://whois.publicissapient.fr');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(3000);
  await page.goto('https://whois.publicissapient.fr');
  await page.getByRole('button', { name: 'Gallery' }).click();
  await page.getByPlaceholder('Search members').click();
  await page.getByPlaceholder('Search members').fill('name');
  await page.getByText('product').click();
};
