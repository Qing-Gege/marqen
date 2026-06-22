import type { CommandManager } from './index'

export const loadFileCommands = (_commandManager: CommandManager): void => {
  // Intentionally empty: project/file-browser commands are no longer exposed as
  // default app-level commands for the simplified document workflow.
}
