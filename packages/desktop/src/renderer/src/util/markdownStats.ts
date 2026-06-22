export interface MarkdownWordCount {
  word: number
  paragraph: number
  character: number
  all: number
}

const stripMarkdownSyntax = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^ {0,3}#{1,6}\s+/gm, '')
    .replace(/^ {0,3}[-*+]\s+/gm, '')
    .replace(/^ {0,3}\d+[.)]\s+/gm, '')
    .replace(/^ {0,3}>\s?/gm, '')
    .replace(/[*_~>#|[\](){}\\]/g, ' ')

export const wordCount = (markdown: string): MarkdownWordCount => {
  const plain = stripMarkdownSyntax(markdown)
  const wordMatches = plain.match(/[\p{L}\p{N}_]+/gu) ?? []
  const paragraphs = markdown
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    word: wordMatches.length,
    paragraph: paragraphs.length,
    character: plain.replace(/\s/g, '').length,
    all: markdown.length
  }
}

