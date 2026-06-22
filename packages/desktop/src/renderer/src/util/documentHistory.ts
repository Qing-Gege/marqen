import type { FileHistory } from '@shared/types/files'

export const getMarkdownHistoryId = (markdown: string): number => {
  let hash = 2166136261
  for (let i = 0; i < markdown.length; i++) {
    hash ^= markdown.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export const makeDocumentHistory = (markdown: string): FileHistory => {
  const id = getMarkdownHistoryId(markdown)
  return {
    stack: [{ id, content: markdown }],
    index: 0,
    lastEditIndex: 0,
    lastInitIndex: id
  }
}
