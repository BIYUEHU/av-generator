import { AbsoluteFill, Video } from 'remotion'

export const VideoBackground: React.FC<{
  src: string
  style?: React.CSSProperties
}> = ({ src, style }) => (
  <AbsoluteFill>
    <Video src={src} style={{ width: '100%', height: '100%', ...style }} />
  </AbsoluteFill>
)
