import { AbsoluteFill, Audio } from 'remotion'
import { AudioVisualizer } from '../components/audio/AudioVisualizer'
import { Background } from '../components/background/Background'
import { SongInfo } from '../components/info/SongInfo'
import { Lyrics } from '../components/lyrics/Lyrics'
import { VideoConfig } from '../types/config'

export const DefaultTemplate: React.FC<VideoConfig> = ({ audio, background, visualizer, lyrics, songInfo }) => {
  return (
    <AbsoluteFill>
      <Audio src={audio.src} startFrom={audio.offsetInSeconds * 30} />
      <Background config={background} />
      <AudioVisualizer config={visualizer} audioSrc={audio.src} />
      {lyrics.map((lyric, index) => (
        <Lyrics key={Number(index)} config={lyric} />
      ))}
      <SongInfo config={songInfo} />
    </AbsoluteFill>
  )
}
