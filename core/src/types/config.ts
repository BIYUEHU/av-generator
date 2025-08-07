export interface StaticOrVideoBackgroundConfig {
  type: 'video' | 'static'
  src: string
  objectFit: 'cover' | 'contain' | 'fill'
  style?: React.CSSProperties
}

export interface CarouselBackgroundConfig {
  type: 'carousel'
  images: string[]
  framesPerImage: number
  fadeFrames: number
  style?: React.CSSProperties
}

export type BackgroundConfig = StaticOrVideoBackgroundConfig | CarouselBackgroundConfig

export interface LyricsConfig {
  content: string
  style?: React.CSSProperties
}

export interface SongInfoConfig {
  coverImage: string
  title: string
  subtitle: string
  coverSize: string
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  subtitleStyle?: React.CSSProperties
}

export interface SimpleSpectrumVisualizerConfig {
  color: string | string[]
  numberOfSamples: 32 | 64 | 128 | 256 | 512 | 1024
  linesToDisplay: number
  mirrorWave: boolean
  style?: React.CSSProperties
}

export interface SimpleWaveformVisualizerConfig {
  color: string
  windowInSeconds: number
  amplitude: number
  style?: React.CSSProperties
}

export interface BaseVisualizerConfig {
  windowInSeconds: number
  amplitude: number
  color: string
  smoothness: number
  glowEffect: boolean
  reactivity: number
  backgroundColor?: string
  gradientColors?: string[]
  style?: React.CSSProperties
}

export interface BarsVisualizerConfig extends BaseVisualizerConfig {
  symmetrical: boolean
  barCount?: number
}

export interface CircularVisualizerConfig extends BaseVisualizerConfig {
  rotation?: number
}

export interface DualWaveformVisualizerConfig extends BaseVisualizerConfig {}

export interface ParticleVisualizerConfig extends BaseVisualizerConfig {
  particleCount?: number
}

export interface SpectrumVisualizerConfig extends BaseVisualizerConfig {
  barCount?: number
}

export interface WaveformVisualizerConfig extends BaseVisualizerConfig {
  symmetrical: boolean
}

export interface VisualizerMapping {
  simpleSpectrum: SimpleSpectrumVisualizerConfig
  simpleWaveform: SimpleWaveformVisualizerConfig
  bars: BarsVisualizerConfig
  circular: CircularVisualizerConfig
  dualWaveform: DualWaveformVisualizerConfig
  particle: ParticleVisualizerConfig
  spectrum: SpectrumVisualizerConfig
  waveform: WaveformVisualizerConfig
}

export type VisualizerConfig = {
  [key in keyof VisualizerMapping]: VisualizerMapping[key] & { type: key }
}[keyof VisualizerMapping]

export interface RenderConfig {
  audio: string
  title?: string
  height?: number
  width?: number
  fps?: number
}

export interface VideoConfig extends Record<string, unknown> {
  render: RenderConfig
  background?: BackgroundConfig
  songInfo?: SongInfoConfig
  visualizers: VisualizerConfig[]
  lyrics: LyricsConfig[]
}
