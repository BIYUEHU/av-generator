import { parseMedia } from '@remotion/media-parser'
import { staticFile } from 'remotion'

export function async(fn: () => Promise<void>) {
  fn()
    .then(() => {})
    .catch((err) => {
      console.error(`Async function failed with error:`, err)
    })
}

export async function calculateDurationInFrames(src: string) {
  const { slowDurationInSeconds } = await parseMedia({
    src,
    fields: {
      slowDurationInSeconds: true
    },
    acknowledgeRemotionLicense: true
  })

  return Math.floor(slowDurationInSeconds * 30)
}

export function getLyrics(sources: string[]) {
  return Promise.all(sources.map((str) => fetch(staticFile(str)).then((res) => res.text())))
}

export function processFrequencyData(
  frequencyData: number[],
  numberOfBars: number,
  options = {
    highFreqCutoff: 0.5,
    baseScale: 0.3,
    maxScale: 3.5
  }
) {
  const maxFreqIndex = Math.floor(frequencyData.length * options.highFreqCutoff)
  const frequencies = new Array(numberOfBars)
  const invNumBars = 1 / numberOfBars
  const powerCache = new Array(numberOfBars)

  for (let i = 0; i < numberOfBars; i++) {
    const normalizedI = i * invNumBars
    const power = 3 + normalizedI * 3
    powerCache[i] = normalizedI ** power
  }

  let maxValue = 0.01
  for (let i = 0; i < numberOfBars; i++) {
    const index = Math.min(Math.round(maxFreqIndex ** (i * invNumBars)), maxFreqIndex)

    const value = frequencyData[index]
    const normalizedI = i * invNumBars
    const lowFreqBoost = Math.max(0.8, 1 - normalizedI * 0.3)
    const scale = (options.baseScale + powerCache[i] * options.maxScale) * lowFreqBoost
    const power = 0.8 - normalizedI * 0.2
    const freq = (value * scale) ** power
    frequencies[i] = freq
    maxValue = Math.max(maxValue, freq)
  }

  const invMaxValue = 1 / maxValue
  return frequencies.map((f) => (f * invMaxValue) ** 0.9)
}

export function lrc2srt(lrc: string): string {
  function pad(n: number, width = 2) {
    return n.toString().padStart(width, '0')
  }

  function formatTime(ms: number): string {
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    const msPart = ms % 1000
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(msPart, 3)}`
  }

  const lines = lrc.split(/\r?\n/)
  const entries: { start: number; end: number; text: string }[] = []

  for (const line of lines) {
    const match = line.match(/\[(\d+):(\d+)(?:\.(\d+))?\](.*)/)
    if (match) {
      const min = parseInt(match[1], 10)
      const sec = parseInt(match[2], 10)
      const ms = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0
      const text = match[4].trim()
      entries.push({
        start: min * 60 * 1000 + sec * 1000 + ms,
        end: 0,
        text
      })
    }
  }

  entries.sort((a, b) => a.start - b.start)

  for (let i = 0; i < entries.length; i++) {
    entries[i].end = i < entries.length - 1 ? entries[i + 1].start - 1 : entries[i].start + 2000
  }

  return entries.map((e, i) => `${i + 1}\n${formatTime(e.start)} --> ${formatTime(e.end)}\n${e.text}\n`).join('\n')
}

export function transform<T>(c: T, transformFn: (c: T) => T) {
  return transformFn(c)
}
