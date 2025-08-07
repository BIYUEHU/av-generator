import { useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { SpectrumVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const SpectrumVisualizer: React.FC<{
  config: SpectrumVisualizerConfig
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

  const barCount = config.barCount || 64
  const barWidth = (width / barCount) * 0.9
  const gap = (width / barCount) * 0.1
  const baselineY = height * 0.8

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
          const barHeight = Math.abs(value) * 300
          const x = i * (barWidth + gap) + gap / 2
          const y = baselineY - barHeight
          const opacity = interpolate(Math.abs(value), [0, 1], [0.4, 1])

          const hueShift = (i / barCount) * 60

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={config.gradientColors ? `url(#${gradientId})` : config.color}
              opacity={opacity}
              rx={1}
              filter={config.glowEffect ? 'url(#glow)' : undefined}
              style={{
                filter: config.gradientColors ? undefined : `hue-rotate(${hueShift}deg)`
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}
