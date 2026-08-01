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

test('homepage exposes unique section anchors and matching navigation targets', async ({ page }) => {
  await page.goto('/');

  const sections = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'community', label: 'Community' },
    { id: 'writing', label: 'Writing' },
    { id: 'contact', label: 'Contact' },
  ];

  for (const section of sections) {
    await expect(page.locator(`#${section.id}`)).toHaveCount(1);
  }

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const section of sections.filter(({ label }) => ['Work', 'Experience', 'About', 'Writing', 'Contact'].includes(label))) {
    await expect(navigation.getByRole('link', { name: section.label, exact: true })).toHaveAttribute(
      'href',
      `#${section.id}`,
    );
  }
});

test('homepage has one h1, sequential headings, and semantic landmarks', async ({ page }) => {
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

test('experience timeline exposes machine-readable start and end dates', async ({ page }) => {
  await page.goto('/');

  const experience = page.locator('#experience');
  const turknet = experience.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'AI Engineer Intern', exact: true }),
  });
  const superhood = experience.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Full Stack ML Intern (Erasmus+)', exact: true }),
  });

  await expect(turknet.locator('time')).toHaveAttribute('datetime', '2026-04-01');
  await expect(turknet.locator('time')).toHaveText('April 2026 - Present');
  await expect(superhood.locator('time')).toHaveAttribute('datetime', '2025-07-01');
  await expect(superhood.locator('meta[itemprop="endDate"]')).toHaveAttribute(
    'content',
    '2025-09-30',
  );
});

test('writing cards expose canonical Medium links and external attributes', async ({ page }) => {
  await page.goto('/');

  const writing = page.locator('#writing');
  const articles = [
    {
      title: 'Smarter Search, Deeper Insights: Unlocking Data with Knowledge Graphs',
      href: 'https://omerahat.medium.com/smarter-search-deeper-insights-unlocking-data-with-knowledge-graphs-70894dbadc1e',
    },
    {
      title: 'Application of Bilinear Interpolation for Image Resizing with MATLAB',
      href: 'https://omerahat.medium.com/application-of-bilinear-interpolation-for-image-resizing-with-matlab-2b073cfed681',
    },
    {
      title: 'Python ve BeautifulSoup Modülü ile Web Scraping',
      href: 'https://omerahat.medium.com/python-ve-beautifulsoup-modülü-ile-web-scraping-9d26816dc86d',
    },
  ];

  for (const article of articles) {
    const card = writing.getByRole('article').filter({
      has: page.getByRole('heading', { name: article.title, exact: true }),
    });
    const link = card.getByRole('link', { name: 'Read on Medium', exact: true });

    await expect(link).toHaveAttribute('href', article.href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

test('contact exposes public links and the generated resume request', async ({ page }) => {
  await page.goto('/');

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

  const resumeLink = contact.getByRole('link', { name: 'Request the resume', exact: true });
  await expect(resumeLink).toHaveAttribute(
    'href',
    'mailto:omerahatcs@gmail.com?subject=Resume%20request%20-%20Omer%20Ahat',
  );
  await expect(contact.getByRole('link')).toHaveCount(4);
  await expect(contact).not.toContainText(/Telegram|\+90|Turknet project/i);
});
