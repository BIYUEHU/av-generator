export const processFrequencyData = (
  frequencyData: number[],
  numberOfBars: number,
  options = {
    highFreqCutoff: 0.5,
    baseScale: 0.3,
    maxScale: 3.5
  }
) => {
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
