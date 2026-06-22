import { app, type BrowserWindow, type MenuItemConstructorOptions } from 'electron'
import { showAboutDialog } from '../actions/help'
import * as actions from '../actions/marqen'
import { t } from '../../i18n'
import type Keybindings from '../../keyboard/shortcutHandler'

// macOS only menu.

export default function(keybindings: Keybindings): MenuItemConstructorOptions {
  return {
    label: t('menu.marqen.title'),
    submenu: [
      {
        label: t('menu.marqen.about'),
        click(_menuItem, focusedWindow) {
          showAboutDialog(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        label: t('menu.marqen.checkUpdates'),
        click(_menuItem, focusedWindow) {
          actions.checkUpdates((focusedWindow as BrowserWindow | undefined) ?? null)
        }
      },
      {
        label: t('menu.marqen.preferences'),
        accelerator: keybindings.getAccelerator('file.preferences') ?? undefined,
        click() {
          actions.userSetting()
        }
      },
      {
        type: 'separator'
      },
      {
        label: t('menu.marqen.services'),
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: t('menu.marqen.hide'),
        accelerator: keybindings.getAccelerator('mt.hide') ?? undefined,
        click() {
          actions.osxHide()
        }
      },
      {
        label: t('menu.marqen.hideOthers'),
        accelerator: keybindings.getAccelerator('mt.hide-others') ?? undefined,
        click() {
          actions.osxHideAll()
        }
      },
      {
        label: t('menu.marqen.showAll'),
        click() {
          actions.osxShowAll()
        }
      },
      {
        type: 'separator'
      },
      {
        label: t('menu.marqen.quit'),
        accelerator: keybindings.getAccelerator('file.quit') ?? undefined,
        click: app.quit
      }
    ]
  }
}
