import { expect, test } from '@playwright/test';

test('mobile navigation opens, closes with Escape, and closes after a link click', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuToggle = page.locator('button[aria-controls="site-navigation"]');
  const navigation = page.locator('#site-navigation');

  await expect(menuToggle).toBeVisible();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();

  await menuToggle.click();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();

  await menuToggle.click();
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
});
