import { useAudioData, visualizeAudio } from '@remotion/media-utils'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { AudioVisualizerSpectrumConfig } from '../../types/config'
import { processFrequencyData } from '../../utils/processFrequencyData'

const getBarGradient = (colors: string[]) => {
  return `linear-gradient(to top, ${colors.join(', ')})`
}

export const Spectrum: React.FC<{
  config: AudioVisualizerSpectrumConfig
  audioSrc: string
}> = ({ config, audioSrc }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const audioData = useAudioData(audioSrc)

  if (!audioData) return null

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: Number(config.numberOfSamples)
  })

  const normalizedData = processFrequencyData(frequencyData, config.linesToDisplay)

  const frequenciesToDisplay = config.mirrorWave
    ? [...normalizedData.slice(1).reverse(), ...normalizedData]
    : normalizedData

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        gap: '0.3%'
      }}
    >
      {frequenciesToDisplay.map((v, i) => (
        <div
          key={Number(i)}
          style={{
            flex: 1,
            ...(Array.isArray(config.color)
              ? { backgroundImage: getBarGradient(config.color) }
              : { backgroundColor: config.color }),
            height: `${Math.min(100, 80 * v)}%`,
            borderRadius: '8px',
            minWidth: '1px',
            filter: `blur(0.5px) brightness(0.8) hue-rotate(${frame * 0.5}deg)`,
            transition: 'filter 0.1s linear'
          }}
        />
      ))}
    </div>
  )
}
