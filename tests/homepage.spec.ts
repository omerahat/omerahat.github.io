import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const resumeHref = 'mailto:omerahatcs@gmail.com?subject=Resume%20request%20-%20Omer%20Ahat';

const countGridTracks = async (page: Page, selector: string) =>
  page.locator(selector).evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns.trim();
    return columns ? columns.split(/\s+/).length : 0;
  });

test('homepage renders the exact hero headline and impact metrics', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('main > .hero')).toHaveAccessibleDescription(
    'I build trustworthy AI that makes complex systems useful. Open to: ML Engineer · AI Engineer · Applied Scientist · Data Scientist Remote preferred; hybrid acceptable in Türkiye and Europe.',
  );

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'AI Engineer & Explainable ML Researcher',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('#hero-roles')).toContainText('ML Engineer');
  await expect(page.locator('#hero-roles')).toContainText('Data Scientist');

  const metrics = page.locator('#impact .impact-strip__value');
  await expect(metrics).toHaveCount(3);
  await expect(metrics).toHaveText(['97%', '2B+', '3.3x']);
});

test('experience entries render scannable evidence lists', async ({ page }) => {
  await page.goto('/');

  const experienceBodies = page.locator('#experience .experience__body');
  await expect(experienceBodies).toHaveCount(11);

  const wingie = page.locator('#experience').getByRole('article').filter({ hasText: 'Wingie Enuygun Group' });
  await expect(wingie).toHaveCount(1);

  for (let index = 0; index < await experienceBodies.count(); index += 1) {
    const evidence = experienceBodies.nth(index);
    await expect(evidence.locator('ul')).toHaveCount(1);
    await expect(evidence.locator('strong')).not.toHaveCount(0);
  }

  const turknet = experienceBodies.filter({ hasText: '60% to 92% weighted F1' });
  await expect(turknet.getByRole('list')).toHaveCount(1);
  await expect(turknet.getByRole('listitem')).toHaveCount(5);
  await expect(turknet.locator('strong').filter({ hasText: '60%' })).toBeVisible();
});

test('homepage renders all featured projects and verified project links', async ({ page }) => {
  await page.goto('/');

  const work = page.locator('#work');
  const projects = work.getByRole('article');
  const projectTitles = [
    'XPRS',
    'Applied AI Systems',
    'Product Recognition System',
    'Ceramic Tile Defect Detection',
    'The Big Score',
    'Federated Learning with Flower',
  ];

  await expect(projects).toHaveCount(6);
  for (const title of projectTitles) {
    await expect(work.getByRole('heading', { name: title, exact: true })).toBeVisible();
  }
  await expect(work.getByRole('heading', { name: 'EXID', exact: true })).toHaveCount(0);
  await expect(work.getByRole('heading', { name: 'ESN-Activities-API', exact: true })).toHaveCount(0);

  const verifiedProjects = [
    {
      title: 'The Big Score',
      href: 'https://github.com/omerahat/gold_rush_demo',
    },
  ];

  for (const project of verifiedProjects) {
    const card = projects.filter({ hasText: project.title });
    const link = card.getByRole('link');

    await expect(card).toHaveCount(1);
    await expect(link).toHaveAttribute('href', project.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

  const ceramicTileCard = projects.filter({ hasText: 'Ceramic Tile Defect Detection' });
  const ceramicTileLinks = [
    {
      name: 'View on GitHub',
      href: 'https://github.com/omerahat/matlab-based-defected-ceramic-tiles-dedection',
    },
    {
      name: 'Read paper',
      href: 'https://dergipark.org.tr/en/pub/aupse/article/1498129',
    },
    {
      name: 'Google Scholar',
      href: 'https://scholar.google.it/citations?view_op=view_citation&hl=en&user=1LIiTREAAAAJ&citation_for_view=1LIiTREAAAAJ:_FxGoFyzp5QC',
    },
  ];

  await expect(ceramicTileCard).toHaveCount(1);
  await expect(ceramicTileCard.getByRole('link')).toHaveCount(3);
  for (const projectLink of ceramicTileLinks) {
    const link = ceramicTileCard.getByRole('link', { name: projectLink.name, exact: true });

    await expect(link).toHaveAttribute('href', projectLink.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

});

test('project contribution and outcome details stack vertically', async ({ page }) => {
  await page.goto('/');

  const detailColumns = await page.locator('#work .project-card__details').evaluateAll((details) =>
    details.map((detail) => getComputedStyle(detail).gridTemplateColumns.trim().split(/\s+/).length),
  );

  expect(detailColumns).toEqual([1, 1, 1, 1, 1, 1]);
});

test('XPRS project exposes its research poster', async ({ page }) => {
  await page.goto('/');

  const xprsCard = page.locator('#work').getByRole('article').filter({ hasText: 'XPRS' });
  const posterAlt = 'XPRS explainable product recommendation system research poster';
  const poster = xprsCard.getByRole('img', { name: posterAlt, exact: true });
  const posterLink = xprsCard.getByRole('link', {
    name: 'Open XPRS research poster at full size',
    exact: true,
  });

  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute('src', '/XPRS-poster-en.jpeg');
  await expect(posterLink).toHaveAttribute('href', '/XPRS-poster-en.jpeg');
  await expect(posterLink).toHaveAttribute('target', '_blank');
  await expect(posterLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('homepage exposes the exact resume mailto and public contact links', async ({ page }) => {
  await page.goto('/');

  const resumeLinks = page.getByRole('link', { name: 'Request the resume', exact: true });
  await expect(resumeLinks).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(resumeLinks.nth(index)).toHaveAttribute('href', resumeHref);
  }

  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: 'omerahatcs@gmail.com', exact: true })).toHaveAttribute(
    'href',
    'mailto:omerahatcs@gmail.com',
  );

  const externalLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/omerahat' },
    { name: 'GitHub', href: 'https://github.com/omerahat' },
  ];

  for (const externalLink of externalLinks) {
    const link = contact.getByRole('link', { name: externalLink.name, exact: true });

    await expect(link).toHaveAttribute('href', externalLink.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

test('homepage keeps unverified writing out of the public selection', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#writing')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Writing', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Medium', exact: true })).toHaveCount(0);

  for (const seasonalEntry of [
    { company: 'ASELSAN', period: 'Spring 2024' },
    { company: 'YetGen', period: 'Spring 2023' },
  ]) {
    const card = page.locator('#experience').getByRole('article').filter({ hasText: seasonalEntry.company });
    await expect(card).toContainText(seasonalEntry.period);
    await expect(card.locator('time')).toHaveCount(0);
    await expect(card.locator('meta[itemprop="endDate"]')).toHaveCount(0);
  }

  const skills = page.locator('#skills');
  for (const unsupportedSkill of ['C#', 'JavaScript', 'LightGBM', 'XGBoost', 'SHAP', 'Supabase']) {
    await expect(skills.getByText(unsupportedSkill, { exact: true })).toHaveCount(0);
  }
});

test('homepage keeps representative links at or above 44px touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');

  const measuredHeights = await page
    .locator('.site-header__brand, .site-header__navigation a, .site-footer a')
    .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));

  expect(measuredHeights.length).toBeGreaterThan(0);
  expect(measuredHeights.every((height) => height >= 44)).toBe(true);
});

test('mobile navigation reflects closed, open, and Escape states', async ({ page }) => {
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
  await expect(menuToggle).toBeFocused();

  await menuToggle.click();
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
});

test('homepage preserves stable section IDs and matching navigation targets', async ({ page }) => {
  await page.goto('/');

  const sections = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'community', label: 'Community' },
    { id: 'contact', label: 'Contact' },
  ];

  for (const section of sections) {
    await expect(page.locator(`#${section.id}`)).toHaveCount(1);
  }

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const section of sections.filter(({ label }) =>
    ['Work', 'Experience', 'About', 'Contact'].includes(label),
  )) {
    await expect(navigation.getByRole('link', { name: section.label, exact: true })).toHaveAttribute(
      'href',
      `#${section.id}`,
    );
  }
});

test('homepage has exactly one h1, sequential headings, and semantic landmarks', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);

  const headingLevels = await page
    .locator('main h1, main h2, main h3, main h4, main h5, main h6')
    .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));

  expect(headingLevels[0]).toBe(1);
  expect(headingLevels.filter((level) => level === 1)).toHaveLength(1);
  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(headingLevels[index]).toBeLessThanOrEqual(headingLevels[index - 1] + 1);
  }
});

test('homepage has no horizontal overflow at the 320px mobile boundary', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  const widths = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));

  expect(widths.documentWidth).toBeLessThanOrEqual(widths.viewportWidth);
  expect(widths.bodyWidth).toBeLessThanOrEqual(widths.viewportWidth);
});

test('homepage uses desktop, tablet, and mobile grid layouts', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');

  expect(await countGridTracks(page, '.hero__grid')).toBe(2);
  expect(await countGridTracks(page, '.projects__grid')).toBe(2);

  await page.setViewportSize({ width: 900, height: 900 });
  expect(await countGridTracks(page, '.hero__grid')).toBe(2);
  expect(await countGridTracks(page, '.projects__grid')).toBe(2);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await countGridTracks(page, '.hero__grid')).toBe(1);
  expect(await countGridTracks(page, '.projects__grid')).toBe(1);
  expect(await countGridTracks(page, '.impact-strip__grid')).toBe(1);
});

test('homepage has no full-page axe accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test('homepage removes nonessential motion when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const motionStyles = await page.locator('.button').first().evaluate((button) => {
    const style = getComputedStyle(button);
    return {
      animationName: style.animationName,
      transitionProperty: style.transitionProperty,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(motionStyles.animationName).toBe('none');
  expect(motionStyles.transitionProperty).toBe('none');
  expect(motionStyles.scrollBehavior).toBe('auto');
});

test('homepage limits interactive transitions to transform and opacity', async ({ page }) => {
  await page.goto('/');

  const disallowedTransitions = await page.locator('a, button').evaluateAll((elements) => {
    const allowedTransitions = new Set(['none', 'opacity', 'transform']);

    return elements.flatMap((element) => {
      const style = getComputedStyle(element);
      const hasTransitionDuration = style.transitionDuration
        .split(',')
        .some((duration) => Number.parseFloat(duration) > 0);

      if (!hasTransitionDuration) {
        return [];
      }

      const properties = style.transitionProperty.split(',').map((property) => property.trim());

      return properties
        .filter((property) => !allowedTransitions.has(property))
        .map((property) => `${element.tagName.toLowerCase()}: ${property}`);
    });
  });

  expect(disallowedTransitions).toEqual([]);
});

test('homepage exposes a visible keyboard focus indicator', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const focusStyle = await page.evaluate(() => {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) {
      return null;
    }

    const style = getComputedStyle(activeElement);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });

  expect(focusStyle).not.toBeNull();
  expect(focusStyle?.outlineStyle).not.toBe('none');
  expect(focusStyle?.outlineWidth).not.toBe('0px');
});

test('experience timeline exposes machine-readable start and end dates', async ({ page }) => {
  await page.goto('/');

  const experience = page.locator('#experience');
  const turknet = experience.getByRole('article').filter({ hasText: 'Turknet' });
  const superhood = experience.getByRole('article').filter({ hasText: 'Superhood Oy' });

  await expect(turknet.locator('time')).toHaveAttribute('datetime', '2026-04-01');
  await expect(turknet.locator('time')).toHaveText('April 2026 - Present');
  await expect(superhood.locator('time')).toHaveAttribute('datetime', '2025-07-01');
  await expect(superhood.locator('meta[itemprop="endDate"]')).toHaveAttribute(
    'content',
    '2025-09-30',
  );
});
