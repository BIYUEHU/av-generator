import { AbsoluteFill, Audio } from 'remotion'
import { Background } from '../components/background/Background'
import { SongInfo } from '../components/info/SongInfo'
import { Lyrics } from '../components/lyrics/Lyrics'
import { AudioVisualizer } from '../components/visualizer/AudioVisualizer'
import { Template } from '../types/common'

export const DefaultTemplate: Template = ({ render, background, visualizers, lyrics, songInfo }) => {
  return (
    <AbsoluteFill>
      <Audio src={render.audio} />
      {background && <Background config={background} />}
      {visualizers.map((visualizer, index) => (
        <AudioVisualizer key={`visualizer-${index}`} config={visualizer} audio={render.audio} />
      ))}
      {lyrics.map((lyric, index) => (
        <Lyrics key={`lyric-${index}`} config={lyric} />
      ))}
      {songInfo && <SongInfo config={songInfo} />}
    </AbsoluteFill>
  )
}
