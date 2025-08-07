import { AbsoluteFill, Img } from 'remotion'

export const StaticBackground: React.FC<{
  src: string
  style?: React.CSSProperties
}> = ({ src, style }) => (
  <AbsoluteFill>
    {src ? (
      <Img src={src} style={{ width: '100%', height: '100%', ...style }} />
    ) : (
      <div style={{ width: '100%', height: '100%', ...style }} />
    )}
  </AbsoluteFill>
)
