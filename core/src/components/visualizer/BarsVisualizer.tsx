import { useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { BarsVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const BarsVisualizer: React.FC<{
  config: BarsVisualizerConfig
  audio: string
}> = ({ config, audio }) => {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const audioData = useAudioData(audio)
  const gradientId = createGradientId(frame)

  const processedData = useMemo(() => {
    if (!audioData) return null
    const numberOfSamples = calculateNumberOfSamples(config.windowInSeconds, true)
    const rawWaveform = visualizeAudioWaveform({
      fps,
      frame,
      audioData,
      numberOfSamples,
      windowInSeconds: config.windowInSeconds,
      channel: 0
    })
    const smoothed = smoothAudioData(rawWaveform, config.smoothness)
    return smoothed.map((value) => value * config.reactivity * config.amplitude)
  }, [audioData, frame, fps, config])

  if (!processedData) return null

  const barCount = config.barCount || 80
  const barWidth = (width / barCount) * 0.8
  const gap = (width / barCount) * 0.2
  const baselineY = height * 0.6

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{
        background: config.backgroundColor || 'transparent',
        ...config.style
      }}
    >
      <GradientsAndFilters
        gradientId={gradientId}
        gradientColors={config.gradientColors}
        glowEffect={config.glowEffect}
      />
      <g>
        {processedData.slice(0, barCount).map((value, i) => {
          const barHeight = Math.abs(value) * 200
          const x = i * (barWidth + gap) + gap / 2
          const y = config.symmetrical ? baselineY - barHeight / 2 : baselineY - barHeight
          const opacity = interpolate(Math.abs(value), [0, 1], [0.3, 1])

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={config.gradientColors ? `url(#${gradientId})` : config.color}
              opacity={opacity}
              rx={2}
              filter={config.glowEffect ? 'url(#glow)' : undefined}
            />
          )
        })}
      </g>
    </svg>
  )
}
