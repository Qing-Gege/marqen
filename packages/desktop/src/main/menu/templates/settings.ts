import { type MenuItemConstructorOptions } from 'electron'
import { userSetting } from '../actions/marqen'
import { t } from '../../i18n'
import type Keybindings from '../../keyboard/shortcutHandler'

export default function(keybindings: Keybindings): MenuItemConstructorOptions {
  return {
    label: t('menu.file.preferences'),
    submenu: [
      {
        label: t('menu.file.preferences'),
        accelerator: keybindings.getAccelerator('file.preferences') ?? undefined,
        click() {
          userSetting()
        }
      }
    ]
  }
}
