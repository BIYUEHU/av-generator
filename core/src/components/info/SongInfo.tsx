import { Img } from 'remotion'
import { SongInfoConfig } from '../../types/config'

export const SongInfo: React.FC<{
  config: SongInfoConfig
}> = ({ config }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        background: 'rgba(0, 0, 0, 0.45)',
        padding: '32px',
        borderRadius: '32px',
        ...config.style
      }}
    >
      <Img
        src={config.coverImage}
        style={{
          width: config.coverSize,
          height: config.coverSize,
          objectFit: 'cover',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
      />
      <div>
        <div
          style={{
            fontSize: '5.5rem',
            fontWeight: 700,
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            ...config.titleStyle
          }}
        >
          {config.title}
        </div>
        <div
          style={{
            fontSize: '3.5rem',
            fontWeight: 500,
            opacity: 0.9,
            color: '#ffffff',
            ...config.subtitleStyle
          }}
        >
          {config.subtitle}
        </div>
      </div>
    </div>
  )
}
