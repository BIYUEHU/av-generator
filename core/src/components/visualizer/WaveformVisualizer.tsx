import { createSmoothSvgPath, useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { WaveformVisualizerConfig } from '../../types/config'
import {
  calculateNumberOfSamples,
  createGradientId,
  GradientsAndFilters,
  smoothAudioData
} from '../../utils/visualizer'

export const WaveformVisualizer: React.FC<{
  config: WaveformVisualizerConfig
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

  const baselineY = height * 0.6

  const points = processedData.map((y, i) => {
    const x = (i / (processedData.length - 1)) * width
    const waveY = baselineY + y * 100
    return { x, y: config.symmetrical ? baselineY - Math.abs(y) * 100 : waveY }
  })

  const path = createSmoothSvgPath({ points })

  const renderContent = () => {
    if (config.symmetrical) {
      const mirrorPoints = processedData.map((y, i) => {
        const x = (i / (processedData.length - 1)) * width
        const waveY = baselineY + Math.abs(y) * 100
        return { x, y: waveY }
      })
      const mirrorPath = createSmoothSvgPath({ points: mirrorPoints })

      return (
        <g>
          <path
            d={path}
            stroke={config.gradientColors ? `url(#${gradientId})` : config.color}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            filter={config.glowEffect ? 'url(#glow)' : undefined}
          />
          <path
            d={mirrorPath}
            stroke={config.gradientColors ? `url(#${gradientId})` : config.color}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            filter={config.glowEffect ? 'url(#glow)' : undefined}
          />
        </g>
      )
    }

    return (
      <path
        d={path}
        stroke={config.gradientColors ? `url(#${gradientId})` : config.color}
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        filter={config.glowEffect ? 'url(#glow)' : undefined}
      />
    )
  }

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
      {renderContent()}
    </svg>
  )
}
