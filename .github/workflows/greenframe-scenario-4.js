async (page) => {
  await page.goto('https://whois.publicissapient.fr');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(3000);
  await page.goto('https://whois.publicissapient.fr');
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByPlaceholder('John').click();
  await page.getByPlaceholder('John').fill('test');
  await page.getByPlaceholder('Doe').click();
  await page.getByPlaceholder('Doe').fill('user');
  await page.getByText('PRODUCT').click();
  await page.locator('select[name="arrivalMonth"]').selectOption('3');
  await page.locator('select[name="arrivalYear"]').selectOption('2021');
  await page.getByRole('button', { name: 'Save profile' }).click();
};
