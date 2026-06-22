export interface LanguageDescriptor {
  name: string
  mode: string
  mime: string
}

const languages: LanguageDescriptor[] = [
  {
    name: 'markdown',
    mode: 'gfm',
    mime: 'text/x-gfm'
  },
  {
    name: 'html',
    mode: 'htmlmixed',
    mime: 'text/html'
  },
  {
    name: 'css',
    mode: 'css',
    mime: 'text/css'
  },
  {
    name: 'javascript',
    mode: 'javascript',
    mime: 'text/javascript'
  },
  {
    name: 'typescript',
    mode: 'javascript',
    mime: 'application/typescript'
  },
  {
    name: 'jsx',
    mode: 'jsx',
    mime: 'text/jsx'
  },
  {
    name: 'json',
    mode: 'javascript',
    mime: 'application/json'
  },
  {
    name: 'python',
    mode: 'python',
    mime: 'text/x-python'
  },
  {
    name: 'shell',
    mode: 'shell',
    mime: 'text/x-sh'
  },
  {
    name: 'sh',
    mode: 'shell',
    mime: 'text/x-sh'
  },
  {
    name: 'yaml',
    mode: 'yaml',
    mime: 'text/x-yaml'
  },
  {
    name: 'xml',
    mode: 'xml',
    mime: 'application/xml'
  },
  {
    name: 'java',
    mode: 'clike',
    mime: 'text/x-java'
  },
  {
    name: 'c',
    mode: 'clike',
    mime: 'text/x-csrc'
  },
  {
    name: 'c++',
    mode: 'clike',
    mime: 'text/x-c++src'
  }
]

export default languages
