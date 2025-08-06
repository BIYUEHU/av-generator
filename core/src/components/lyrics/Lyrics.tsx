import { parseSrt } from '@remotion/captions'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { LyricsConfig } from '../../types/config'

export const Lyrics: React.FC<{
  config: LyricsConfig
}> = ({ config }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const currentMs = (frame / fps) * 1000

  const captions = config?.src ? parseSrt({ input: config.src }).captions : null

  const currentIndex = captions?.findIndex((caption) => currentMs >= caption.startMs && currentMs <= caption.endMs)

  if (currentIndex === undefined || currentIndex < 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: '1%',
        top: '1%',
        transform: 'translateX(0%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '8px',
        ...config.style
      }}
    >
      {captions && (
        <div
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '40px',
            color: '#dddddd',
            ...config.style
          }}
        >
          {captions[currentIndex].text}
        </div>
      )}
    </div>
  )
}
