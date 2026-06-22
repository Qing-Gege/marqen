import { type MenuItemConstructorOptions } from 'electron'
import { oneDarkThemes, railscastsThemes } from 'common/theme'
import * as actions from '../actions/theme'
import { t } from '../../i18n'
import type Preference from '../../preferences'

const humanizeThemeId = (id: string): string =>
  id
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

export default function(userPreference: Preference): MenuItemConstructorOptions {
  const { theme } = userPreference.getAll() as { theme?: string }
  const themeItem = (
    labelKey: string,
    id: string
  ): MenuItemConstructorOptions => ({
    label: t(labelKey),
    type: 'radio',
    id,
    checked: theme === id,
    click() {
      actions.selectTheme(id)
    }
  })

  const submenu: MenuItemConstructorOptions[] = [
    {
      label: t('menu.theme.lightThemes'),
      enabled: false
    },
    themeItem('menu.theme.cadmiumLight', 'light'),
    themeItem('menu.theme.graphiteLight', 'graphite'),
    themeItem('menu.theme.ulyssesLight', 'ulysses'),
    { type: 'separator' },
    {
      label: t('menu.theme.darkThemes'),
      enabled: false
    },
    themeItem('menu.theme.cadmiumDark', 'dark'),
    ...[...railscastsThemes, ...oneDarkThemes]
      .filter((id) => id !== 'dark')
      .map((id) => ({
        label: humanizeThemeId(id),
        type: 'radio' as const,
        id,
        checked: theme === id,
        click() {
          actions.selectTheme(id)
        }
      }))
  ]

  return {
    label: t('menu.theme.theme'),
    id: 'themeMenu',
    submenu
  }
}
