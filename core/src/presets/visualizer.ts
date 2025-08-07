import {
  BarsVisualizerConfig,
  CircularVisualizerConfig,
  DualWaveformVisualizerConfig,
  ParticleVisualizerConfig,
  SimpleSpectrumVisualizerConfig,
  SimpleWaveformVisualizerConfig,
  SpectrumVisualizerConfig,
  WaveformVisualizerConfig
} from '../types/config'

export const barsVisualizerConfigPreset = (): BarsVisualizerConfig => ({
  windowInSeconds: 0.3,
  amplitude: 3.5,
  color: '#ffd700',
  smoothness: 1,
  glowEffect: true,
  reactivity: 1.8,
  symmetrical: false,
  gradientColors: ['#00ffd5ff', '#474affff'],
  barCount: 64,
  style: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100% '
  }
})

export const waveformVisualizerConfigPreset: WaveformVisualizerConfig = {
  windowInSeconds: 0.7,
  amplitude: 5,
  color: '#00ff88',
  smoothness: 3,
  glowEffect: true,
  reactivity: 2.2,
  symmetrical: true,
  gradientColors: ['#ff0080', '#00ff88', '#0080ff'],
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%'
  }
}

export const circularVisualizerConfigPreset: CircularVisualizerConfig = {
  windowInSeconds: 0.7,
  amplitude: 5,
  smoothness: 3,
  glowEffect: true,
  reactivity: 2.2,
  rotation: 0,
  color: '#8a2be2',
  gradientColors: ['#8a2be2', '#da70d6', '#ff69b4'],
  style: {
    position: 'absolute',
    borderRadius: '50%',
    overflow: 'hidden'
  }
}

export const dualWaveformVisualizerConfigPreset: DualWaveformVisualizerConfig = {
  windowInSeconds: 0.7,
  amplitude: 5,
  smoothness: 3,
  glowEffect: true,
  reactivity: 2.2,
  color: '#00ced1',
  backgroundColor: '#000022',
  style: {
    position: 'absolute',
    opacity: 0.6
  }
}

export const particleVisualizerConfigPreset: ParticleVisualizerConfig = {
  windowInSeconds: 0.3,
  amplitude: 8,
  smoothness: 3,
  glowEffect: true,
  color: '#2a27ccff',
  particleCount: 200,
  reactivity: 2,
  backgroundColor: 'transparent'
}

export const spectrumVisualizerConfigPreset: SpectrumVisualizerConfig = {
  windowInSeconds: 0.3,
  amplitude: 8,
  smoothness: 3,
  glowEffect: true,
  barCount: 32,
  reactivity: 2.2,
  color: '#ffd700',
  style: {
    position: 'fixed',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%) rotate(90deg)',
    width: '70vh'
  }
}

export const simpleWaveformVisualizerConfigPreset: SimpleWaveformVisualizerConfig = {
  color: '#ff0095ff',
  windowInSeconds: 0.7,
  amplitude: 5
}

export const simpleSpectrumVisualizerPreset: SimpleSpectrumVisualizerConfig = {
  color: ['#00ff00', '#23a1b8'],
  numberOfSamples: 512,
  linesToDisplay: 85,
  mirrorWave: true,
  style: {
    height: '600px',
    top: '170px'
  }
}
