type cssProperties = array<(string, string)>
type staticOrVideoBackgroundConfig = {
  src: string,
  objectFit: [#cover | #contain | #fill],
  style?: cssProperties,
}

type carouselBackgroundConfig = {
  images: array<string>,
  framesPerImage: int,
  fadeFrames: int,
  style?: cssProperties,
}

type backgroundConfig =
  | Static(staticOrVideoBackgroundConfig)
  | Video(staticOrVideoBackgroundConfig)
  | Carousel(carouselBackgroundConfig)

type lyricsConfig = {
  content: string,
  style?: cssProperties,
}

type songInfoConfig = {
  coverImage: string,
  title: string,
  subtitle: string,
  coverSize: string,
  style?: cssProperties,
  titleStyle?: cssProperties,
  subtitleStyle?: cssProperties,
}

type color = Color(string) | Colors(array<string>)

type simpleSpectrumVisualizerConfig = {
  color: color,
  numberOfSamples: [#32 | #64 | #128 | #256 | #512 | #1024],
  linesToDisplay: int,
  mirrorWave: bool,
  style?: cssProperties,
}

type simpleWaveformVisualizerConfig = {
  color: color,
  windowInSeconds: float,
  amplitude: float,
  style?: cssProperties,
}

type baseVisualizerConfig = {
  windowInSeconds: float,
  amplitude: float,
  color: color,
  smoothness: float,
  glowEffect: bool,
  reactivity: float,
  backgroundColor?: string,
  gradientColors?: array<string>,
  style?: cssProperties,
}

type barsVisualizerConfig = {
  symmetrical: bool,
  barCount?: int,
}

type circularVisualizerConfig = {rotation?: float}

type dualWaveformVisualizerConfig = baseVisualizerConfig

type particleVisualizerConfig = {
  ...baseVisualizerConfig,
  particleCount?: int,
}

type spectrumVisualizerConfig = {
  ...baseVisualizerConfig,
  barCount?: int,
}

type waveformVisualizerConfig = {
  ...baseVisualizerConfig,
  symmetrical: bool,
}

type visualizerMapping = {
  simpleSpectrum: simpleSpectrumVisualizerConfig,
  simpleWaveform: simpleWaveformVisualizerConfig,
  bars: barsVisualizerConfig,
  circular: circularVisualizerConfig,
  dualWaveform: dualWaveformVisualizerConfig,
  particle: particleVisualizerConfig,
  spectrum: spectrumVisualizerConfig,
  waveform: waveformVisualizerConfig,
}

type visualizerConfig =
  | SimpleSpectrum(simpleSpectrumVisualizerConfig)
  | SimpleWaveform(simpleWaveformVisualizerConfig)
  | Bars(barsVisualizerConfig)
  | Circular(circularVisualizerConfig)
  | DualWaveform(dualWaveformVisualizerConfig)
  | Particle(particleVisualizerConfig)
  | Spectrum(spectrumVisualizerConfig)
  | Waveform(waveformVisualizerConfig)

type renderConfig = {
  audio: string,
  title?: string,
  height?: int,
  width?: int,
  fps?: int,
}

type videoConfig = {
  render: renderConfig,
  background?: backgroundConfig,
  songInfo?: songInfoConfig,
  visualizers: array<visualizerConfig>,
  lyrics: array<lyricsConfig>,
}
