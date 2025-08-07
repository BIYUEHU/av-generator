import React from 'react'
import { AbsoluteFill } from 'remotion'
import { VisualizerConfig } from '../../types/config'
import { BarsVisualizer } from './BarsVisualizer'
import { CircularVisualizer } from './CircularVisualizer'
import { DualWaveformVisualizer } from './DualWaveformVisualizer'
import { ParticleVisualizer } from './ParticleVisualizer'
import { SimpleSpectrumVisualizer } from './SimpleSpectrumVisualizer'
import { SimpleWaveformVisualizer } from './SimpleWaveformVisualizer'
import { SpectrumVisualizer } from './SpectrumVisualizer'
import { WaveformVisualizer } from './WaveformVisualizer'

export const AudioVisualizer: React.FC<{
  config: VisualizerConfig
  audio: string
}> = ({ config, audio }) => {
  return (
    <AbsoluteFill>
      {config.type === 'simpleSpectrum' ? (
        <SimpleSpectrumVisualizer config={config} audio={audio} />
      ) : config.type === 'simpleWaveform' ? (
        <SimpleWaveformVisualizer config={config} audio={audio} />
      ) : config.type === 'spectrum' ? (
        <SpectrumVisualizer config={config} audio={audio} />
      ) : config.type === 'waveform' ? (
        <WaveformVisualizer config={config} audio={audio} />
      ) : config.type === 'dualWaveform' ? (
        <DualWaveformVisualizer config={config} audio={audio} />
      ) : config.type === 'bars' ? (
        <BarsVisualizer config={config} audio={audio} />
      ) : config.type === 'circular' ? (
        <CircularVisualizer config={config} audio={audio} />
      ) : (
        <ParticleVisualizer config={config} audio={audio} />
      )}
    </AbsoluteFill>
  )
}
