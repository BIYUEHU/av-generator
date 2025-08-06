import React from 'react'
import { AbsoluteFill } from 'remotion'
import { AudioVisualizerConfig } from '../../types/config'
import { Spectrum } from './Spectrum'
import { Waveform } from './Waveform'

export const AudioVisualizer: React.FC<{
  config: AudioVisualizerConfig
  audioSrc: string
}> = ({ config, audioSrc }) => {
  return (
    <AbsoluteFill
      style={{
        height: '400px',
        ...config.style
      }}
    >
      {config.type === 'spectrum' ? (
        <Spectrum config={config} audioSrc={audioSrc} />
      ) : (
        <Waveform config={config} audioSrc={audioSrc} />
      )}
    </AbsoluteFill>
  )
}
