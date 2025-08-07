export function calculateNumberOfSamples(windowInSeconds: number, isBarsType: boolean = false) {
  const baseSampleCount = isBarsType ? 64 : 2048
  return Math.min(Math.max(windowInSeconds <= 1 ? baseSampleCount : baseSampleCount * windowInSeconds, 64), 8192)
}

export function smoothAudioData(data: number[], smoothness: number): number[] {
  if (smoothness <= 0) return data

  const smoothed = [...data]
  for (let i = 0; i < data.length; i++) {
    let sum = data[i]
    let count = 1

    for (let j = 1; j <= smoothness; j++) {
      if (i - j >= 0) {
        sum += data[i - j]
        count++
      }
      if (i + j < data.length) {
        sum += data[i + j]
        count++
      }
    }
    smoothed[i] = sum / count
  }
  return smoothed
}

export const createGradientId = (frame: number) => `audioGradient-${frame}`

export const GradientsAndFilters: React.FC<{
  gradientId: string
  gradientColors?: string[]
  glowEffect: boolean
}> = ({ gradientId, gradientColors, glowEffect }) => {
  if (!gradientColors || gradientColors.length < 2) {
    return glowEffect ? (
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    ) : null
  }

  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        {gradientColors.map((color, index) => (
          <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
        ))}
      </linearGradient>
      <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%" r="50%">
        {gradientColors.map((color, index) => (
          <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
        ))}
      </radialGradient>
      {glowEffect && (
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      )}
    </defs>
  )
}
