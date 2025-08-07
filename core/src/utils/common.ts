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

export function lrcToSrt(lrcContent: string) {
  const lines = lrcContent.split('\n')
  let srtContent = ''
  let index = 1

  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/)
    if (match) {
      const [, minutes, seconds, centiseconds, text] = match
      const startTime = `00:${minutes}:${seconds},${centiseconds}0`
      const endTime = `00:${minutes}:${(parseInt(seconds) + 5).toString().padStart(2, '0')},${centiseconds}0`

      srtContent += `${index}\n${startTime} --> ${endTime}\n${text.trim()}\n\n`
      index++
    }
  }

  return srtContent
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
