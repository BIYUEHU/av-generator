import { createSmoothSvgPath, useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { CircularVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const CircularVisualizer: React.FC<{
  config: CircularVisualizerConfig
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

  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.3
  const angleStep = (Math.PI * 2) / processedData.length

  const points = processedData.map((value, i) => {
    const angle = i * angleStep + (config.rotation || 0)
    const r = radius + Math.abs(value) * 100
    return {
      x: centerX + Math.cos(angle) * r,
      y: centerY + Math.sin(angle) * r
    }
  })

  const path = createSmoothSvgPath({ points })

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
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke={config.color} strokeWidth={1} opacity={0.3} />
        <path
          d={path}
          fill={config.gradientColors ? `url(#${gradientId}-radial)` : config.color}
          fillOpacity={0.6}
          stroke={config.color}
          strokeWidth={2}
          filter={config.glowEffect ? 'url(#glow)' : undefined}
        />
      </g>
    </svg>
  )
}
