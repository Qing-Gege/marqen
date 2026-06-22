import { expect, test } from '@playwright/test'
import type { ElectronApplication, Page } from 'playwright'
import { launchWithMarkdown, clickMenuById } from './helpers'

test.describe('View modes', () => {
  let app: ElectronApplication
  let page: Page

  test.beforeAll(async() => {
    const launched = await launchWithMarkdown('# View modes\n\nBody.\n')
    app = launched.app
    page = launched.page
  })

  test.afterAll(async() => {
    if (app) await app.close()
  })

  test('Toggle focus mode adds and removes .focus on .editor-wrapper', async() => {
    await clickMenuById(app, 'focusModeMenuItem')
    await expect(page.locator('.editor-wrapper')).toHaveClass(/(^|\s)focus(\s|$)/)
    await clickMenuById(app, 'focusModeMenuItem')
    await page.waitForFunction(
      () => {
        const el = document.querySelector('.editor-wrapper')
        return !el || !el.classList.contains('focus')
      },
      null,
      { timeout: 5000 }
    )
  })

  test('Toggle typewriter mode adds and removes .typewriter on .editor-wrapper', async() => {
    await clickMenuById(app, 'typewriterModeMenuItem')
    await expect(page.locator('.editor-wrapper')).toHaveClass(/(^|\s)typewriter(\s|$)/)
    await clickMenuById(app, 'typewriterModeMenuItem')
    await page.waitForFunction(
      () => {
        const el = document.querySelector('.editor-wrapper')
        return !el || !el.classList.contains('typewriter')
      },
      null,
      { timeout: 5000 }
    )
  })
})
