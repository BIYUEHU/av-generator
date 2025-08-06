import { createSmoothSvgPath, useAudioData, visualizeAudioWaveform } from '@remotion/media-utils'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { AudioVisualizerWaveformConfig } from '../../types/config'

const calculateNumberOfSamples = (windowInSeconds: number) => {
  const baseSampleCount = 2048
  return Math.min(Math.max(windowInSeconds <= 1 ? baseSampleCount : baseSampleCount * windowInSeconds, 2048), 8192)
}

export const Waveform: React.FC<{
  config: AudioVisualizerWaveformConfig
  audioSrc: string
}> = ({ config, audioSrc }) => {
  const { width, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const audioData = useAudioData(audioSrc)

  if (!audioData) return null

  const numberOfSamples = calculateNumberOfSamples(config.windowInSeconds)
  const waveform = visualizeAudioWaveform({
    fps,
    frame,
    audioData,
    numberOfSamples,
    windowInSeconds: config.windowInSeconds,
    channel: 0
  })

  const path = createSmoothSvgPath({
    points: waveform.map((y, i) => ({
      x: (i / (waveform.length - 1)) * width,
      y: 200 + ((y * 400) / 2) * config.amplitude
    }))
  })

  return (
    // biome-ignore lint: .
    <svg width="100%" height="100%" viewBox={`0 0 ${width} 400`}>
      <path d={path} stroke={config.color} fill="none" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}
