import { Template } from '../types/common'
import {
  BackgroundConfig,
  LyricsConfig,
  RenderConfig,
  SongInfoConfig,
  VideoConfig,
  VisualizerConfig,
  VisualizerMapping
} from '../types/config'
import { bootstrap } from './bootstrap'

export class Builder {
  private readonly lyricsConfig: LyricsConfig[] = []

  private readonly visualizersConfig: VisualizerConfig[] = []

  private songInfoConfig?: SongInfoConfig

  private backgroundConfig?: BackgroundConfig

  private constructor(private renderConfig: RenderConfig) {}

  public extend(config: Partial<VideoConfig> | Builder): this {
    if (config instanceof Builder) {
      return this.extend(config.build())
    }
    if (config.background) this.backgroundConfig = { ...this.backgroundConfig, ...config.background }
    if (config.songInfo) this.songInfoConfig = { ...this.songInfoConfig, ...config.songInfo }
    if (config.visualizers) this.visualizersConfig.push(...config.visualizers)
    if (config.lyrics) this.lyricsConfig.push(...config.lyrics)
    return this
  }

  public addLyric(config: LyricsConfig | LyricsConfig[]) {
    this.lyricsConfig.push(...(Array.isArray(config) ? config : [config]))
    return this
  }

  public setBackground(config: BackgroundConfig) {
    this.backgroundConfig = config
    return this
  }

  public setSongInfo(config: SongInfoConfig) {
    this.songInfoConfig = config
    return this
  }

  public addVisualizer<T extends keyof VisualizerMapping>(type: T, config: VisualizerMapping[T]) {
    this.visualizersConfig.push({ type, ...config } as VisualizerConfig)
    return this
  }

  public build(): VideoConfig {
    return {
      render: this.renderConfig,
      background: this.backgroundConfig,
      visualizers: this.visualizersConfig,
      lyrics: this.lyricsConfig,
      songInfo: this.songInfoConfig
    }
  }

  public bootstrap(template: Template) {
    if (this.renderConfig.audio === 'PRESET') {
      throw new Error('Can not bootstrap a preset builder')
    }
    bootstrap(template, this.build())
  }

  public static create(config: RenderConfig) {
    return new Builder(config)
  }

  public static preset() {
    return new Builder({ audio: 'PRESET' })
  }
}
