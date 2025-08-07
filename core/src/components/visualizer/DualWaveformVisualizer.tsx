import { createSmoothSvgPath, useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { DualWaveformVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const DualWaveformVisualizer: React.FC<{
  config: DualWaveformVisualizerConfig
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

  const topWave = processedData.map((y, i) => ({
    x: (i / (processedData.length - 1)) * width,
    y: height * 0.3 + y * 80
  }))

  const bottomWave = processedData.map((y, i) => ({
    x: (i / (processedData.length - 1)) * width,
    y: height * 0.7 - y * 80
  }))

  const topPath = createSmoothSvgPath({ points: topWave })
  const bottomPath = createSmoothSvgPath({ points: bottomWave })

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
        <path
          d={topPath}
          stroke={config.gradientColors ? `url(#${gradientId})` : config.color}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          filter={config.glowEffect ? 'url(#glow)' : undefined}
        />
        <path
          d={bottomPath}
          stroke={config.gradientColors ? `url(#${gradientId})` : config.color}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          filter={config.glowEffect ? 'url(#glow)' : undefined}
        />
      </g>
    </svg>
  )
}
