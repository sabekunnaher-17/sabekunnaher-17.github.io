import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHash } from 'node:crypto'
import { destinations, person, routePath, study, work } from '../src/content'

const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

for (const destination of destinations) {
  test(`${destination.label}: direct entry, refresh, assets, metadata, layout, and accessibility`, async ({ page }, testInfo) => {
    const problems: string[] = []
    page.on('pageerror', error => problems.push(error.message))
    page.on('console', event => { if (event.type() === 'error') problems.push(event.text()) })
    page.on('response', response => { if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`) })
    const path = routePath(destination.slug)
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    expect(await response!.text()).toContain(`<title>${destination.title.replaceAll('&', '&amp;')}</title>`)
    await expect(page).toHaveTitle(destination.title)
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main section.page')).toHaveCount(1)
    await expect(page.locator(`#${destination.slug || 'home'}`)).toBeVisible()
    await expect(page.locator(`nav a[href="${path}"]`)).toHaveAttribute('aria-current', 'page')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://sabekunnaher-17.github.io${path}`)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://sabekunnaher-17.github.io${path}`)
    expect((await page.reload())?.status()).toBe(200)
    if (destination.slug) expect((await page.request.get(`/${destination.slug}`)).status()).toBe(200)
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded()
      await img.evaluate(async element => { if (element instanceof HTMLImageElement) await element.decode() })
    }
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('main img').evaluateAll(images => images.every(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0))).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
    await page.locator('footer').scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(accessibility.violations).toEqual([])
    expect(problems).toEqual([])
    await page.screenshot({ path: testInfo.outputPath(`${destination.slug || 'home'}.png`), fullPage: true })
  })
}

test('Home is focused, genuine portrait is prominent, and both exploration actions work', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('main h1')).toHaveText('SabekunnaherAntora.')
  await expect(page.getByText('Full-Stack Developer', { exact: true })).toBeVisible()
  await expect(page.locator('main #projects, main #research, main #education, main .case-study')).toHaveCount(0)
  await expect(page.locator('.home-photo img')).toHaveAttribute('src', person.portrait)
  const photo = (await page.locator('.home-photo').boundingBox())!
  const copy = (await page.locator('.home-copy').boundingBox())!
  expect(photo.width).toBeGreaterThanOrEqual(page.viewportSize()!.width <= 580 ? page.viewportSize()!.width * .7 : 180)
  if (page.viewportSize()!.width <= 580) expect(photo.y).toBeGreaterThanOrEqual(copy.y + copy.height)
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.locator('main h1')).toBeFocused()
  await page.getByRole('link', { name: 'Return Home', exact: true }).click()
  await page.getByRole('link', { name: 'Explore Portfolio', exact: false }).click()
  await expect(page).toHaveURL(/\/projects\/$/)
})

test('all navigation destinations work with focus, active page, and mobile close', async ({ page }) => {
  await page.goto('/')
  for (const destination of [...destinations.slice(1), destinations[0]]) {
    const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
    if (await menu.isVisible()) await menu.click()
    await page.locator(`nav a[href="${routePath(destination.slug)}"]`).click()
    await expect(page).toHaveURL(new RegExp(`${routePath(destination.slug)}$`))
    await expect(page.locator('main h1')).toBeFocused()
    await expect(page.locator(`nav a[href="${routePath(destination.slug)}"]`)).toHaveAttribute('aria-current', 'page')
    await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toHaveCount(0)
    expect(await page.evaluate(() => scrollY)).toBe(0)
    if (page.viewportSize()!.width <= 1100) expect((await page.locator('main h1').boundingBox())!.y).toBeGreaterThanOrEqual(68)
  }
})

test('Back and Forward preserve client routing and route-specific metadata', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => { document.documentElement.dataset.historyProbe = 'retained' })
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click()
  await page.getByRole('link', { name: 'A question beyond the code', exact: false }).click()
  await expect(page).toHaveURL(/\/research\/$/)
  await page.goBack()
  await expect(page).toHaveTitle('Selected Work — Sabekunnaher Antora')
  await page.goBack()
  await expect(page.locator('#home')).toBeVisible()
  await page.goForward()
  await expect(page.locator('#projects')).toBeVisible()
  expect(await page.locator('html').getAttribute('data-history-probe')).toBe('retained')
})

test('keyboard skip, drawer focus loop, and Escape are accessible', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
  if (await menu.isVisible()) {
    await menu.click()
    await expect(page.locator('nav a').first()).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('.rail-drawer a').last()).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
  }
})

test('exact supplied CV downloads from Home, About, and Contact; asset bytes are correct', async ({ page, request }) => {
  const response = await request.get(person.cv)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/pdf')
  expect(sha(await response.body())).toBe('2bb00e85236252bea895c73d4f8f6651e5232a63ab2c819406a64df3cd51efd1')
  for (const route of ['/', '/about/', '/contact/']) {
    await page.goto(route)
    const download = page.waitForEvent('download')
    await page.getByRole('link', { name: 'Download CV', exact: true }).click()
    expect((await download).suggestedFilename()).toBe('Sabekunnaher_Antora_CV.pdf')
  }
  const photo = await request.get(person.portrait)
  expect(photo.status()).toBe(200)
  expect(sha(await photo.body())).toBe('978106a985ab266dd93c81a3a377e4afbbcdffa58a7693ec9a9699c4078565fb')
  for (const asset of ['/favicon.svg', '/assets/social-preview.png', '/robots.txt', '/sitemap.xml']) expect((await request.get(asset)).status()).toBe(200)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const destination of destinations) expect(sitemap).toContain(`<loc>https://sabekunnaher-17.github.io${routePath(destination.slug)}</loc>`)
})

test('project, contact and research destinations preserve verified content and attribution', async ({ page }) => {
  await page.goto('/projects/')
  for (const project of work) await expect(page.locator(`main a[href="${project.repo}"]`)).toHaveCount(1)
  await expect(page.getByText('my teammate handled authentication and doctor administration.', { exact: false })).toBeVisible()
  await expect(page.getByText('not verified payment-gateway integrations', { exact: false })).toBeVisible()
  await expect(page.locator('main a').filter({ hasText: /live demo/i })).toHaveCount(0)
  await page.goto('/research/')
  await expect(page.locator(`a[href="${study.paper}"]`)).toHaveCount(1)
  await expect(page.getByText('50.8%', { exact: true })).toBeVisible()
  await expect(page.getByText('across both conditions', { exact: false })).toBeVisible()
  await page.goto('/contact/')
  await expect(page.locator(`main a[href="${person.linkedin}"]`)).toHaveCount(1)
  await expect(page.locator(`main a[href="mailto:${person.email}"]`)).toHaveCount(2)
  expect(await page.locator('a[target="_blank"]').evaluateAll(links => links.every(link => link.getAttribute('rel')?.includes('noopener')))).toBe(true)
})

test('page transitions respect reduced motion and unknown routes offer Home', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('.route-stage').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/about/')
  expect(await page.locator('.route-stage').evaluate(el => getComputedStyle(el).animationName)).toBe('page-in')
  await page.goto('/a-missing-page/')
  await expect(page.getByRole('heading', { name: 'This page isn’t here.' })).toBeVisible()
  await page.getByRole('link', { name: 'Return Home', exact: true }).first().click()
  await expect(page.locator('#home')).toBeVisible()
})

test('responsive navigation switches cleanly at the rail breakpoint', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 1050, height: 900 })
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
  await menu.click()
  await page.setViewportSize({ width: 1180, height: 900 })
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(menu).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})
