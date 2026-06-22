// Copy from https://github.com/utatti/simple-pandoc/blob/master/index.js
import { spawn } from 'child_process'
import type { Readable } from 'stream'
import commandExists from 'command-exists'
import { isFile2 } from 'common/filesystem'

const pandocCommand = 'pandoc'
const envPandocPath = 'MARQEN_PANDOC'
const legacyEnvPandocPath = 'MARKTEXT_PANDOC'

const getCommand = (): string => {
  const configuredCommand = getConfiguredCommand()
  if (configuredCommand) {
    return configuredCommand
  }
  return pandocCommand
}

const getConfiguredCommand = (): string | null => {
  if (envPathExists()) {
    return (process.env[envPandocPath] || process.env[legacyEnvPandocPath]) as string
  }
  return null
}

interface PandocConverter {
  (): Promise<string>
  stream: (srcStream: NodeJS.ReadableStream) => Readable | null
}

interface PandocFn {
  (from: string, to: string, ...args: string[]): PandocConverter
  exists: () => boolean
}

const pandoc = ((from: string, to: string, ...args: string[]): PandocConverter => {
  const command = getCommand()
  const option = ['-s', from, '-t', to].concat(args)

  const converter = ((): Promise<string> =>
    new Promise((resolve, reject) => {
      const proc = spawn(command, option)
      proc.on('error', reject)
      let data = ''
      let stderr = ''
      proc.stdout.on('data', (chunk: Buffer | string) => {
        data += chunk.toString()
      })
      proc.stderr.on('data', (chunk: Buffer | string) => {
        stderr += chunk.toString()
      })
      proc.on('close', (code) => {
        if (code === 0) {
          resolve(data)
        } else {
          reject(new Error(stderr || `Pandoc exited with code ${code ?? 'unknown'}`))
        }
      })
      proc.stdout.on('error', reject)
      proc.stderr.on('error', reject)
      proc.stdin.end()
    })) as PandocConverter

  converter.stream = (srcStream: NodeJS.ReadableStream): Readable | null => {
    const proc = spawn(command, option)
    srcStream.pipe(proc.stdin)
    return proc.stdout
  }

  return converter
}) as PandocFn

pandoc.exists = (): boolean => {
  if (envPathExists()) {
    return true
  }
  return commandExists.sync(pandocCommand)
}

const envPathExists = (): boolean => {
  const configuredPath = process.env[envPandocPath] || process.env[legacyEnvPandocPath]
  return !!configuredPath && isFile2(configuredPath)
}

export default pandoc
