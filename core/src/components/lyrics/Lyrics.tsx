import { parseSrt } from '@remotion/captions'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { LyricsConfig } from '../../types/config'

export const Lyrics: React.FC<{
  config: LyricsConfig
}> = ({ config }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const currentMs = (frame / fps) * 1000

  const captions = config?.content ? parseSrt({ input: config.content }).captions : null

  const currentIndex = captions?.findIndex((caption) => currentMs >= caption.startMs && currentMs <= caption.endMs)

  if (currentIndex === undefined || currentIndex < 0) return null

  return (
    <div
      style={{
        fontSize: '40px',
        color: '#dddddd',
        ...config.style
      }}
    >
      {captions?.[currentIndex].text}
    </div>
  )
}
