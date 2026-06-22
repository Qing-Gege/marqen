// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

type ModeLoader = () => Promise<unknown>

const codeMirrorMode: Record<string, ModeLoader> = {
  '../../../../node_modules/codemirror/mode/clike/clike.js': () => import('codemirror/mode/clike/clike.js'),
  '../../../../node_modules/codemirror/mode/css/css.js': () => import('codemirror/mode/css/css.js'),
  '../../../../node_modules/codemirror/mode/gfm/gfm.js': () => import('codemirror/mode/gfm/gfm.js'),
  '../../../../node_modules/codemirror/mode/htmlmixed/htmlmixed.js': () => import('codemirror/mode/htmlmixed/htmlmixed.js'),
  '../../../../node_modules/codemirror/mode/javascript/javascript.js': () => import('codemirror/mode/javascript/javascript.js'),
  '../../../../node_modules/codemirror/mode/jsx/jsx.js': () => import('codemirror/mode/jsx/jsx.js'),
  '../../../../node_modules/codemirror/mode/markdown/markdown.js': () => import('codemirror/mode/markdown/markdown.js'),
  '../../../../node_modules/codemirror/mode/python/python.js': () => import('codemirror/mode/python/python.js'),
  '../../../../node_modules/codemirror/mode/shell/shell.js': () => import('codemirror/mode/shell/shell.js'),
  '../../../../node_modules/codemirror/mode/stex/stex.js': () => import('codemirror/mode/stex/stex.js'),
  '../../../../node_modules/codemirror/mode/xml/xml.js': () => import('codemirror/mode/xml/xml.js'),
  '../../../../node_modules/codemirror/mode/yaml/yaml.js': () => import('codemirror/mode/yaml/yaml.js')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CodeMirrorLike = any

const loadMore = (CodeMirror: CodeMirrorLike): void => {
  if (!CodeMirror.modeURL) {
    CodeMirror.modeURL = '../../../../node_modules/codemirror/mode/%N/%N.js'
  }

  const loading: Record<string, Array<() => void>> = {}
  function splitCallback(cont: () => void, n: number): () => void {
    let countDown = n
    return function() {
      if (--countDown === 0) cont()
    }
  }
  function ensureDeps(mode: string, cont: () => void): void {
    const deps: string[] | undefined = CodeMirror.modes[mode].dependencies
    if (!deps) return cont()
    const missing: string[] = []
    for (let i = 0; i < deps.length; ++i) {
      if (!Object.prototype.hasOwnProperty.call(CodeMirror.modes, deps[i])) {
        missing.push(deps[i])
      }
    }
    if (!missing.length) return cont()
    const split = splitCallback(cont, missing.length)
    for (let i = 0; i < missing.length; ++i) {
      CodeMirror.requireMode(missing[i], split)
    }
  }

  CodeMirror.requireMode = function(mode: string | { name: string }, cont: () => void): void {
    if (typeof mode !== 'string') {
      mode = mode.name
    }
    if (Object.prototype.hasOwnProperty.call(CodeMirror.modes, mode)) return ensureDeps(mode, cont)
    if (Object.prototype.hasOwnProperty.call(loading, mode)) {
      loading[mode].push(cont)
      return
    }

    const list = (loading[mode] = [cont])

    const pathKey: string = CodeMirror.modeURL.replace(/%N/g, mode)

    if (!pathKey) {
      delete loading[mode]
      console.error(`Cannot find path for CodeMirror mode ${mode}`)
      return
    }

    const loader = codeMirrorMode[pathKey]
    if (typeof loader !== 'function') {
      delete loading[mode]
      console.error(`Invalid loader for CodeMirror mode ${mode}`)
      return
    }

    loader()
      .then(() => {
        ensureDeps(mode as string, function() {
          for (let i = 0; i < list.length; ++i) {
            list[i]()
          }
        })
      })
      .catch((err: unknown) => {
        console.error(`Failed to load CodeMirror mode "${mode as string}"`, err)
      })
  }

  CodeMirror.autoLoadMode = function(instance: CodeMirrorLike, mode: string): void {
    if (!Object.prototype.hasOwnProperty.call(CodeMirror.modes, mode)) {
      CodeMirror.requireMode(mode, function() {
        instance.setOption('mode', instance.getOption('mode'))
      })
    }
  }
}
export default loadMore
