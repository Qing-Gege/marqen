import { type BrowserWindow, type MenuItemConstructorOptions } from 'electron'
import * as actions from '../actions/format'
import { t } from '../../i18n'
import type Keybindings from '../../keyboard/shortcutHandler'

export default function(keybindings: Keybindings): MenuItemConstructorOptions {
  return {
    id: 'formatMenuItem',
    label: t('menu.format.format'),
    submenu: [
      {
        id: 'strongMenuItem',
        label: t('menu.format.bold'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.strong') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.strong(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        id: 'emphasisMenuItem',
        label: t('menu.format.italic'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.emphasis') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.emphasis(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        id: 'underlineMenuItem',
        label: t('menu.format.underline'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.underline') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.underline(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        type: 'separator'
      },
      {
        id: 'superscriptMenuItem',
        label: t('menu.format.superscript'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.superscript') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.superscript(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        id: 'subscriptMenuItem',
        label: t('menu.format.subscript'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.subscript') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.subscript(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        id: 'highlightMenuItem',
        label: t('menu.format.highlight'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.highlight') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.highlight(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        label: t('menu.format.highlightColor'),
        submenu: [
          {
            label: t('menu.format.highlightYellow'),
            click(_menuItem, focusedWindow) {
              actions.highlightWithColor(focusedWindow as BrowserWindow | undefined, 'yellow')
            }
          },
          {
            label: t('menu.format.highlightGreen'),
            click(_menuItem, focusedWindow) {
              actions.highlightWithColor(focusedWindow as BrowserWindow | undefined, 'green')
            }
          },
          {
            label: t('menu.format.highlightBlue'),
            click(_menuItem, focusedWindow) {
              actions.highlightWithColor(focusedWindow as BrowserWindow | undefined, 'blue')
            }
          },
          {
            label: t('menu.format.highlightPink'),
            click(_menuItem, focusedWindow) {
              actions.highlightWithColor(focusedWindow as BrowserWindow | undefined, 'pink')
            }
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        id: 'strikeMenuItem',
        label: t('menu.format.strikethrough'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.strike') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.strikethrough(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        id: 'hyperlinkMenuItem',
        label: t('menu.format.hyperlink'),
        type: 'checkbox',
        accelerator: keybindings.getAccelerator('format.hyperlink') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.hyperlink(focusedWindow as BrowserWindow | undefined)
        }
      },
      {
        type: 'separator'
      },
      {
        label: t('menu.format.clearFormat'),
        accelerator: keybindings.getAccelerator('format.clear-format') ?? undefined,
        click(_menuItem, focusedWindow) {
          actions.clearFormat(focusedWindow as BrowserWindow | undefined)
        }
      }
    ]
  }
}
