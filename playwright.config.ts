import { defineConfig } from '@playwright/test'

const deployed = process.env.PORTFOLIO_BASE_URL
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: { baseURL: deployed || 'http://127.0.0.1:4183', channel: process.env.CI ? undefined : 'chrome', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 834, height: 1112 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
  ],
  webServer: deployed ? undefined : { command: 'npm run preview -- --port 4183 --strictPort', url: 'http://127.0.0.1:4183', reuseExistingServer: false },
})
