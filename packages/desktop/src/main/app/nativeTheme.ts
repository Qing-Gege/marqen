import { isDarkThemeId } from '../../common/theme'

export type NativeThemeSource = 'dark' | 'light' | 'system'

type NativeThemePreferences = {
  followSystemTheme?: boolean
  theme?: unknown
}

export const isDarkApplicationTheme = (theme: unknown): boolean => {
  return isDarkThemeId(theme)
}

export const getNativeThemeSource = (preferences: NativeThemePreferences): NativeThemeSource => {
  if (preferences.followSystemTheme) {
    return 'system'
  }
  return isDarkApplicationTheme(preferences.theme) ? 'dark' : 'light'
}
