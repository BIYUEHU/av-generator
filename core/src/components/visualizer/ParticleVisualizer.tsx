import { useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { ParticleVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const ParticleVisualizer: React.FC<{
  config: ParticleVisualizerConfig
  audio: string
}> = ({ config, audio }) => {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const audioData = useAudioData(audio)
  const gradientId = createGradientId(frame)

  const processedData = useMemo(() => {
    if (!audioData) return null
    const numberOfSamples = calculateNumberOfSamples(config.windowInSeconds, false)
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

  const particleCount = config.particleCount || 50
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
        {processedData.slice(0, particleCount).map((value, i) => {
          const x = (i / (particleCount - 1)) * width
          const y = baselineY + value * 150
          const size = interpolate(Math.abs(value), [0, 1], [2, 8])
          const opacity = interpolate(Math.abs(value), [0, 1], [0.2, 1])

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill={config.gradientColors ? `url(#${gradientId})` : config.color}
              opacity={opacity}
              filter={config.glowEffect ? 'url(#glow)' : undefined}
            />
          )
        })}
      </g>
    </svg>
  )
}
