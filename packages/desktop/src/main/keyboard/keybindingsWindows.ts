// Key bindings for Windows.

// NOTE: Avoid `Ctrl+Alt` and `AltGr` shortcuts on Windows because these are used to produce alternative characters.
//       Unlike Linux, `Ctrl+Alt` is an alias to `AltGr` on Windows and will produce alternative characters too.
//       We'll should try bind no keys to `Alt` "modifiers" because there are only a few key bindings available.

const keybindings: Map<string, string> = new Map([
  // Marqen menu on macOS only
  ['mt.hide', ''],
  ['mt.hide-others', ''],

  // File menu
  ['file.new-window', 'Ctrl+N'],
  ['file.new-tab', 'Ctrl+T'],
  ['file.open-file', 'Ctrl+O'],
  ['file.save', 'Ctrl+S'],
  ['file.save-as', 'Ctrl+Shift+S'],
  ['file.move-file', ''],
  ['file.rename-file', ''],
  ['file.print', 'Ctrl+P'],
  ['file.preferences', 'Ctrl+,'],
  ['file.close-tab', 'Ctrl+W'],
  ['file.close-window', 'Ctrl+Shift+W'],
  ['file.quit', 'Ctrl+Q'],

  // File > Export submenu
  ['file.export-file.pdf', 'Ctrl+Alt+E'],

  // Edit menu
  ['edit.undo', 'Ctrl+Z'],
  ['edit.redo', 'Ctrl+Y'],
  ['edit.cut', 'Ctrl+X'],
  ['edit.copy', 'Ctrl+C'],
  ['edit.paste', 'Ctrl+V'],
  ['edit.copy-as-rich', 'Ctrl+Shift+C'],
  ['edit.paste-as-plaintext', 'Ctrl+Shift+V'],
  ['edit.select-all', 'Ctrl+A'],
  ['edit.duplicate', 'Ctrl+Alt+D'],
  ['edit.create-paragraph', ''],
  ['edit.delete-paragraph', 'Ctrl+Shift+D'],
  ['edit.find', 'Ctrl+F'],
  ['edit.find-next', 'F3'],
  ['edit.find-previous', 'Shift+F3'],
  ['edit.replace', 'Ctrl+R'],
  ['edit.screenshot', ''], // macOS only

  // Paragraph menu
  ['paragraph.heading-1', 'Ctrl+Alt+1'],
  ['paragraph.heading-2', 'Ctrl+Alt+2'],
  ['paragraph.heading-3', 'Ctrl+Alt+3'],
  ['paragraph.upgrade-heading', 'Ctrl+Plus'],
  ['paragraph.degrade-heading', 'Ctrl+-'],
  ['paragraph.table', 'Ctrl+Shift+T'],
  ['paragraph.quote-block', 'Ctrl+Shift+Q'],
  ['paragraph.order-list', 'Ctrl+Shift+7'],
  ['paragraph.bullet-list', 'Ctrl+Shift+L'],
  ['paragraph.task-list', 'Ctrl+Alt+X'],
  ['paragraph.paragraph', 'Ctrl+Shift+N'],
  ['paragraph.horizontal-line', 'Ctrl+Shift+U'],

  // Format menu
  ['format.strong', 'Ctrl+B'],
  ['format.emphasis', 'Ctrl+I'],
  ['format.underline', 'Ctrl+U'],
  ['format.superscript', 'Ctrl+Shift+='],
  ['format.subscript', 'Ctrl+='],
  ['format.highlight', 'Ctrl+Shift+H'],
  ['format.strike', 'Ctrl+Shift+X'],
  ['format.hyperlink', 'Ctrl+K'],
  ['format.image', 'Ctrl+Shift+I'],
  ['format.clear-format', 'Ctrl+Space'],

  // Window menu
  ['window.minimize', 'Ctrl+M'],
  ['window.toggle-always-on-top', ''],
  ['window.zoomIn', ''],
  ['window.zoomOut', ''],
  ['window.toggle-full-screen', 'F11'],

  // View menu
  ['view.typewriter-mode', 'Ctrl+Shift+G'],
  ['view.focus-mode', 'Ctrl+Shift+J'],
  ['view.toggle-sidebar', 'Ctrl+J'],
  ['view.toggle-toc', ''],
  ['view.toggle-tabbar', 'Ctrl+Shift+B'],
  ['view.reload-images', 'F5'],

  // ======== Not included in application menu ========================
  ['tabs.cycleForward', 'Ctrl+Tab'],
  ['tabs.cycleBackward', 'Ctrl+Shift+Tab'],
  ['tabs.switchToLeft', 'Ctrl+PageUp'],
  ['tabs.switchToRight', 'Ctrl+PageDown'],
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
