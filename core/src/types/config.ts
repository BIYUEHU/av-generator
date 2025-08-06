import { zColor } from '@remotion/zod-types'
import { z } from 'zod'

export const CSS = z.map(
  z.string(),
  z.union([z.string(), z.number(), z.map(z.string(), z.union([z.string(), z.number()]))])
)

export const StaticOrVideoBackgroundConfig = z.object({
  type: z.union([z.literal('staticImage'), z.literal('video')]),
  src: z.string(),
  objectFit: z.enum(['cover', 'contain', 'fill']).default('cover'),
  style: CSS.optional()
})

export const CarouselBackgroundConfig = z.object({
  type: z.literal('carousel'),
  images: z.array(z.string()),
  framesPerImage: z.number().default(900),
  fadeFrames: z.number().default(400),
  style: CSS.optional()
})

export const BackgroundConfig = z.union([StaticOrVideoBackgroundConfig, CarouselBackgroundConfig])

export const AudioVisualizerSpectrumConfig = z.object({
  type: z.literal('spectrum'),
  color: z.union([zColor(), z.array(zColor())]),
  numberOfSamples: z.enum(['32', '64', '128', '256', '512', '1024']),
  linesToDisplay: z.number().min(1),
  mirrorWave: z.boolean(),
  style: CSS.optional()
})

export const AudioVisualizerWaveformConfig = z.object({
  type: z.literal('waveform'),
  color: zColor(),
  windowInSeconds: z.number().min(0.1),
  amplitude: z.number().min(0.1),
  style: CSS.optional()
})

export const AudioVisualizerConfig = z.union([AudioVisualizerSpectrumConfig, AudioVisualizerWaveformConfig])

export const LyricsConfig = z.object({
  src: z.string(),
  style: CSS.optional()
})

export const SongInfoConfig = z.object({
  coverImage: z.string(),
  title: z.string(),
  subtitle: z.string(),
  position: z.enum(['top', 'bottom']),
  coverSize: z.string(),
  style: CSS.optional(),
  titleStyle: CSS.optional(),
  subtitleStyle: CSS.optional()
})

export const VideoConfig = z.object({
  audio: z.object({
    src: z.string(),
    offsetInSeconds: z.number().min(0).default(0)
  }),
  background: BackgroundConfig,
  visualizer: AudioVisualizerConfig,
  lyrics: LyricsConfig.optional(),
  songInfo: SongInfoConfig
})

export type BackgroundConfig =
  | (Omit<z.infer<typeof StaticOrVideoBackgroundConfig>, 'style'> & {
    style?: React.CSSProperties
  })
  | (Omit<z.infer<typeof CarouselBackgroundConfig>, 'style'> & {
    style?: React.CSSProperties
  })

export type AudioVisualizerSpectrumConfig = Omit<z.infer<typeof AudioVisualizerSpectrumConfig>, 'style'> & {
  style?: React.CSSProperties
}

export type AudioVisualizerWaveformConfig = Omit<z.infer<typeof AudioVisualizerWaveformConfig>, 'style'> & {
  style?: React.CSSProperties
}

export type AudioVisualizerConfig = AudioVisualizerSpectrumConfig | AudioVisualizerWaveformConfig

export type LyricsConfig = Omit<z.infer<typeof LyricsConfig>, 'style'> & {
  style?: React.CSSProperties
}

export type SongInfoConfig = Omit<z.infer<typeof SongInfoConfig>, 'style' | 'titleStyle' | 'subtitleStyle'> & {
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  subtitleStyle?: React.CSSProperties
}

export type VideoConfig = {
  audio: z.infer<typeof VideoConfig>['audio']
  background: BackgroundConfig
  visualizer: AudioVisualizerConfig
  lyrics: [LyricsConfig]
  songInfo: SongInfoConfig
}
