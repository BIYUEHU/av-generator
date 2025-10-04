import 'av-generator/styles.css'
import {
  Builder,
  bootstrap2,
  DefaultTemplate,
  LyricsPresets,
  lrc2srt,
  SakuraFalling,
  SongInfoPresets,
  transform,
  VisualizerPresets
} from 'av-generator'
import { registerRoot, staticFile } from 'remotion'

const lyrics = [
  `[00:09.000]君が代は
[00:20.000]千代に八千代に
[00:30.000]さざれ石の
[00:42.000]巌となりて
[00:52.000]苔の生すまで
`,
  `[00:09.000]吾皇盛世兮
[00:20.000]千秋万代
[00:30.000]沙砾
[00:42.000]成岩兮
[00:52.000]遍生青苔`,
  `[00:09.000]ki mi ga yo wa
[00:20.000]chi yo ni ya chi yo ni
[00:30.000]sa za re i shi
[00:42.000]i wa o to na ri te
[00:52.000]ko ke no mu su ma de`
].map(lrc2srt)

registerRoot(() =>
  bootstrap2(
    (props) => (
      <>
        {DefaultTemplate(props)}
        <SakuraFalling />
      </>
    ),
    Builder.create({ audio: staticFile('audio.mp3') })
      .setBackground({
        type: 'static',
        src: staticFile('persist/japan_sena_r.png'),
        objectFit: 'cover'
      })
      .setSongInfo(
        transform(SongInfoPresets.bottomLeft(staticFile('1.png'), '君が代', 'AI 姫野星奏'), (c) => {
          delete c.style?.bottom
          c.style!.top = '20px'
          return c
        })
      )
      .addVisualizer('waveform', {
        ...VisualizerPresets.waveform.electric(),
        style: {
          position: 'absolute',
          bottom: '-30%',
          left: '0',
          width: '100%'
        },
        gradientColors: ['#f02d2dff', '#da6596ff']
      })
      .addLyric(
        transform(LyricsPresets.single.top(lyrics[0]), (c) => {
          c.style = {
            ...c.style,
            color: '#db61cbff',
            top: '7%',
            left: '92%',
            fontFamily: 'Hachi Maru Pop',
            fontWeight: 400,
            fontSize: '75px',
            writingMode: 'vertical-rl',
            textOrientation: 'upright'
          }
          return c
        })
      )
      .addLyric(
        transform(LyricsPresets.single.top(lyrics[1]), (c) => {
          c.style = {
            ...c.style,
            color: '#d42222ff',
            top: '7%',
            left: '87%',
            fontFamily: 'Zhi Mang Xing',
            fontWeight: 300,
            fontSize: '73px',
            writingMode: 'vertical-rl',
            textOrientation: 'upright'
          }
          return c
        })
      )
      .addLyric(
        transform(LyricsPresets.single.top(lyrics[2]), (c) => {
          c.style = {
            ...c.style,
            color: '#000000ff',
            top: '10%',
            left: '50%',
            fontFamily: 'Helvetica Neue',
            fontWeight: 400,
            fontSize: '60px'
          }
          return c
        })
      )
      .build()
  )
)
