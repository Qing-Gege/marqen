export const PATH_SEPARATOR: string = window.path.sep

export const THEME_STYLE_ID = 'ag-theme'
export const COMMON_STYLE_ID = 'ag-common-style'

export const DEFAULT_EDITOR_FONT_FAMILY =
  '"LXGW Bright Code GB", "LXGW Bright Code", "LXGW Bright GB", Aptos, Inter, "Avenir Next", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"'
export const DEFAULT_CODE_FONT_FAMILY =
  '"LXGW Bright Code GB", "LXGW Bright Code", "JetBrains Mono", "SFMono-Regular", "Cascadia Code", "Fira Code", "DejaVu Sans Mono", monospace'
export const DEFAULT_STYLE = Object.freeze({
  codeFontFamily: DEFAULT_CODE_FONT_FAMILY,
  codeFontSize: '14px',
  hideScrollbar: false,
  theme: 'light'
})

export { railscastsThemes, oneDarkThemes } from '../../common/theme'
