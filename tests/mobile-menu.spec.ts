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

test('project cards expose verified external links and no fabricated XPRS link', async ({ page }) => {
  await page.goto('/');

  const projects = page.locator('#work');
  const verifiedProjects = [
    {
      title: 'EXID',
      href: 'https://github.com/omerahat/ExplainableIntrusionDetection-EXID',
    },
    {
      title: 'Ceramic Tile Defect Detection',
      href: 'https://github.com/omerahat/matlab-based-defected-ceramic-tiles-dedection',
    },
    {
      title: 'ESN-Activities-API',
      href: 'https://github.com/omerahat/ESN-Activities-API',
    },
  ];

  for (const project of verifiedProjects) {
    const card = projects.getByRole('article').filter({
      has: page.getByRole('heading', { name: project.title, exact: true }),
    });
    const link = card.getByRole('link');

    await expect(link).toHaveAttribute('href', project.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

  const xprsCard = projects.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'XPRS', exact: true }),
  });

  await expect(xprsCard.getByRole('link')).toHaveCount(0);
});
