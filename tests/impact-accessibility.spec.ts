import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('impact strip has no color contrast violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .include('#impact')
    .withRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('selected work has no color contrast violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .include('#work')
    .withRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});
