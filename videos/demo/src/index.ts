import {
  Builder,
  bootstrap2,
  DefaultTemplate,
  LyricsPresets,
  lrc2srt,
  SongInfoPresets,
  transform,
  VisualizerPresets
} from 'av-generator'
import { registerRoot, staticFile } from 'remotion'

const lyrics = [``].map(lrc2srt)

registerRoot(() =>
  bootstrap2(
    DefaultTemplate,
    Builder.create({ audio: staticFile('a.mp3') })
      .setBackground({
        type: 'carousel',
        images: ['1.png', '2.png', '3.png'].map(staticFile),
        framesPerImage: 1200,
        fadeFrames: 400
      })
      .setSongInfo(
        transform(SongInfoPresets.topRight(staticFile('icon.png'), '', 'AI '), (c) => {
          c.style!.left = '20px'
          c.titleStyle!.color = '#e45ccdff'
          c.subtitleStyle!.color = '#cf75b4ff'
          delete c.style?.right
          return c
        })
      )
      .addVisualizer('waveform', {
        ...VisualizerPresets.waveform.electric(),
        gradientColors: ['#e73a91ff', '#2992e7ff', '#00ccffff']
      })
      .addLyric(
        ((c) => {
          c.style!.color = '#2992e7ff'
          return c
        })(LyricsPresets.single.bottomWithBg(lyrics[0]))
      )
      .build()
  )
)
