import { expect, test } from '@playwright/test'
import type { ElectronApplication, Page } from 'playwright'
import { launchElectron } from './helpers'

test.describe('Check Launch Marqen', () => {
  let app: ElectronApplication
  let page: Page

  test.beforeAll(async() => {
    const { app: electronApp, page: firstPage } = await launchElectron()
    app = electronApp
    page = firstPage
  })

  test.afterAll(async() => {
    await app.close()
  })

  test('Empty Marqen', async() => {
    const title = await page.title()
    const hasMarqenTitle = /^Marqen|Untitled-1 - Marqen$/.test(title)
    const hasWelcomeTitle = await page
      .getByText('Marqen', { exact: true })
      .first()
      .isVisible()
      .catch(() => false)
    expect(hasMarqenTitle || hasWelcomeTitle).toBeTruthy()
  })
})
