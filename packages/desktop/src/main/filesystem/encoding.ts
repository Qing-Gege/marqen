import type { Encoding } from 'common/encoding'

// Byte Order Marks to detect endianness and encoding.
const BOM_ENCODINGS: Record<string, number[]> = {
  utf8: [0xef, 0xbb, 0xbf],
  utf16be: [0xfe, 0xff],
  utf16le: [0xff, 0xfe]
}

const checkSequence = (buffer: Buffer, sequence: number[]): boolean => {
  if (buffer.length < sequence.length) {
    return false
  }
  return sequence.every((v, i) => v === buffer[i])
}

/**
 * Guess the encoding from the buffer.
 */
export const guessEncoding = (buffer: Buffer, _autoGuessEncoding: boolean): Encoding => {
  const isBom = false

  // Detect UTF8- and UTF16-BOM encodings.
  for (const [key, value] of Object.entries(BOM_ENCODINGS)) {
    if (checkSequence(buffer, value)) {
      return { encoding: key, isBom: true }
    }
  }

  return { encoding: 'utf8', isBom }
}
