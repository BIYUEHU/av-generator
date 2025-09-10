import {
  async,
  Builder,
  bootstrap,
  DefaultTemplate,
  getLyrics,
  LyricsPresets,
  SongInfoPresets,
  VisualizerPresets
} from 'av-generator'
import { staticFile } from 'remotion'

async(async () => {
  const lyrics = await getLyrics(['a.srt'])
  bootstrap(
    DefaultTemplate,
    Builder.create({ audio: staticFile('a.mp3') })
      .setBackground({
        type: 'carousel',
        images: ['1.png', '2.png', '3.png'].map(staticFile),
        framesPerImage: 1200,
        fadeFrames: 400
      })
      // TODO: better persets mixins
      .setSongInfo(((c) => {
        c.style!.left = '20px'
        c.titleStyle!.color = '#e45ccdff'
        c.subtitleStyle!.color = '#cf75b4ff'
        delete c.style?.right
        return c
      })(SongInfoPresets.topRight(staticFile('icon.png'), '刚好遇见你', 'AI 有村路美')))
      .addVisualizer('waveform', {
        ...VisualizerPresets.waveform.electric(),
        gradientColors: ['#e73a91ff', '#2992e7ff', '#00ccffff'],
      })
      .addLyric(((c) => {
        c.style!.color = '#2992e7ff'
        return c
      })(LyricsPresets.single.bottomWithBg(lyrics[0])))
      .build()
  )
})
