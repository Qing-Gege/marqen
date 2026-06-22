import { sanitize, EXPORT_DOMPURIFY_CONFIG } from './dompurify'

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })

const renderInline = (value: string): string =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>')

const markdownToHtml = async(markdown: string): Promise<string> => {
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)
  const html = blocks
    .map((block) => {
      const heading = /^(#{1,6})\s+(.+)$/.exec(block)
      if (heading) {
        const level = heading[1].length
        return `<h${level}>${renderInline(heading[2])}</h${level}>`
      }

      if (/^[-*+]\s+/m.test(block)) {
        const items = block
          .split('\n')
          .map((line) => line.replace(/^[-*+]\s+/, '').trim())
          .filter(Boolean)
          .map((line) => `<li>${renderInline(line)}</li>`)
          .join('')
        return `<ul>${items}</ul>`
      }

      return `<p>${renderInline(block).replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  return sanitize(`<article class="markdown-body">${html}</article>`, EXPORT_DOMPURIFY_CONFIG)
}

export default markdownToHtml
