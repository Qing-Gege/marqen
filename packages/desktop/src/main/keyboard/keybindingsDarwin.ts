// Key bindings for macOS.

// NOTE: Avoid pure `Option` aka `Alt` shortcuts on macOS because these are used to produce alternative characters on all letters and digits.
//       Our current key manager will forbid the usage of these key combinations too.

const keybindings: Map<string, string> = new Map([
  // Marqen menu
  ['mt.hide', 'Command+H'],
  ['mt.hide-others', 'Command+Option+H'],
  ['file.preferences', 'Command+,'], // located under Marqen menu in macOS only

  // File menu
  ['file.new-window', 'Command+N'],
  ['file.new-tab', 'Command+T'],
  ['file.open-file', 'Command+O'],
  ['file.save', 'Command+S'],
  ['file.save-as', 'Command+Shift+S'],
  ['file.move-file', ''],
  ['file.rename-file', ''],
  ['file.print', ''],
  ['file.close-tab', 'Command+W'],
  ['file.close-window', 'Command+Shift+W'],
  ['file.quit', 'Command+Q'],

  // File > Export submenu
  ['file.export-file.pdf', 'Ctrl+Alt+E'],

  // Edit menu
  ['edit.undo', 'Command+Z'],
  ['edit.redo', 'Command+Shift+Z'],
  ['edit.cut', 'Command+X'],
  ['edit.copy', 'Command+C'],
  ['edit.paste', 'Command+V'],
  ['edit.copy-as-rich', 'Command+Shift+C'],
  ['edit.paste-as-plaintext', 'Command+Shift+V'],
  ['edit.select-all', 'Command+A'],
  ['edit.duplicate', 'Command+Option+D'],
  ['edit.create-paragraph', ''],
  ['edit.delete-paragraph', 'Shift+Command+D'],
  ['edit.find', 'Command+F'],
  ['edit.find-next', 'Cmd+G'],
  ['edit.find-previous', 'Cmd+Shift+G'],
  ['edit.replace', 'Command+Option+F'],
  ['edit.screenshot', 'Command+Option+A'], // macOS only

  // Paragraph menu
  ['paragraph.heading-1', 'Command+Option+1'],
  ['paragraph.heading-2', 'Command+Option+2'],
  ['paragraph.heading-3', 'Command+Option+3'],
  ['paragraph.upgrade-heading', 'Command+Plus'],
  ['paragraph.degrade-heading', 'Command+-'],
  ['paragraph.table', 'Command+Shift+T'],
  ['paragraph.quote-block', 'Command+Option+Q'],
  ['paragraph.order-list', 'Command+Shift+7'],
  ['paragraph.bullet-list', 'Command+Shift+L'],
  ['paragraph.task-list', 'Command+Option+X'],
  ['paragraph.paragraph', 'Command+Option+0'],
  ['paragraph.horizontal-line', 'Command+Option+-'],

  // Format menu
  ['format.strong', 'Command+B'],
  ['format.emphasis', 'Command+I'],
  ['format.underline', 'Command+U'],
  ['format.superscript', 'Command+Shift+='],
  ['format.subscript', 'Command+='],
  ['format.highlight', 'Shift+Command+H'],
  ['format.strike', 'Command+Shift+X'],
  ['format.hyperlink', 'Command+K'],
  ['format.image', 'Command+Shift+I'],
  ['format.clear-format', 'Command+Space'],

  // Window menu
  ['window.minimize', 'Command+M'],
  ['window.toggle-always-on-top', ''],
  ['window.zoomIn', ''],
  ['window.zoomOut', ''],
  ['window.toggle-full-screen', 'Ctrl+Command+F'],

  // View menu
  ['view.typewriter-mode', 'Command+Option+T'],
  ['view.focus-mode', 'Command+Shift+J'],
  ['view.toggle-sidebar', 'Command+J'],
  ['view.toggle-toc', ''],
  ['view.toggle-tabbar', 'Command+Option+B'],
  ['view.reload-images', 'Command+R'],

  // ======== Not included in application menu ========================
  ['tabs.cycleForward', 'Ctrl+Tab'],
  ['tabs.cycleBackward', 'Ctrl+Shift+Tab'],
  ['tabs.switchToLeft', 'Command+PageUp'],
  ['tabs.switchToRight', 'Command+PageDown'],
  ['tabs.switchToFirst', 'Ctrl+1'],
  ['tabs.switchToSecond', 'Ctrl+2'],
  ['tabs.switchToThird', 'Ctrl+3'],
  ['tabs.switchToFourth', 'Ctrl+4'],
  ['tabs.switchToFifth', 'Ctrl+5'],
  ['tabs.switchToSixth', 'Ctrl+6'],
  ['tabs.switchToSeventh', 'Ctrl+7'],
  ['tabs.switchToEighth', 'Ctrl+8'],
  ['tabs.switchToNinth', 'Ctrl+9'],
  ['tabs.switchToTenth', 'Ctrl+0']
])

export default keybindings
