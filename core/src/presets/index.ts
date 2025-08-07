import {
  BarsVisualizerConfig,
  CircularVisualizerConfig,
  LyricsConfig,
  RenderConfig,
  SongInfoConfig,
  StaticOrVideoBackgroundConfig,
  VideoConfig,
  WaveformVisualizerConfig
} from '../types/config'
import { Builder } from '../utils/builder'

export const LyricsPresets = {
  single: {
    center: (content: string): LyricsConfig => ({
      content,
      style: {
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        letterSpacing: '0.02em',
        maxWidth: '80%',
        lineHeight: 1.2
      }
    }),

    bottomWithBg: (content: string): LyricsConfig => ({
      content,
      style: {
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '36px',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '16px 32px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        maxWidth: '70%',
        lineHeight: 1.3
      }
    }),

    top: (content: string): LyricsConfig => ({
      content,
      style: {
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        maxWidth: '85%',
        lineHeight: 1.2
      }
    })
  },

  double: {
    stacked: (currentLyric: string, nextLyric: string): LyricsConfig[] => [
      {
        content: currentLyric,
        style: {
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '44px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '80%',
          lineHeight: 1.2
        }
      },
      {
        content: nextLyric,
        style: {
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '40px',
          fontWeight: '500',
          color: '#dddddd',
          textAlign: 'center',
          textShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '75%',
          lineHeight: 1.2,
          opacity: 0.8
        }
      }
    ],

    card: (currentLyric: string, nextLyric: string): LyricsConfig[] => [
      {
        content: currentLyric,
        style: {
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '38px',
          fontWeight: '600',
          color: '#ffffff',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px 40px 12px 40px',
          borderRadius: '16px 16px 4px 4px',
          backdropFilter: 'blur(15px)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '70%',
          lineHeight: 1.3
        }
      },
      {
        content: nextLyric,
        style: {
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '28px',
          fontWeight: '400',
          color: '#e0e0e0',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 40px 16px 40px',
          borderRadius: '4px 4px 12px 12px',
          backdropFilter: 'blur(10px)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '70%',
          lineHeight: 1.2,
          opacity: 0.9
        }
      }
    ]
  },

  triple: {
    cascade: (prevLyric: string, currentLyric: string, nextLyric: string): LyricsConfig[] => [
      {
        content: prevLyric,
        style: {
          position: 'absolute',
          bottom: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '28px',
          fontWeight: '400',
          color: '#999999',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '70%',
          lineHeight: 1.2,
          opacity: 0.6
        }
      },
      {
        content: currentLyric,
        style: {
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '0 0 25px rgba(255, 255, 255, 0.2)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '80%',
          lineHeight: 1.2
        }
      },
      {
        content: nextLyric,
        style: {
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '30px',
          fontWeight: '500',
          color: '#cccccc',
          textAlign: 'center',
          textShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '75%',
          lineHeight: 1.2,
          opacity: 0.7
        }
      }
    ],

    cardStack: (prevLyric: string, currentLyric: string, nextLyric: string): LyricsConfig[] => [
      {
        content: prevLyric,
        style: {
          position: 'absolute',
          bottom: '32%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          fontWeight: '400',
          color: '#bbbbbb',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 24px',
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '60%',
          lineHeight: 1.2,
          opacity: 0.7
        }
      },
      {
        content: currentLyric,
        style: {
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '36px',
          fontWeight: '600',
          color: '#ffffff',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '16px 32px',
          borderRadius: '12px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '70%',
          lineHeight: 1.3
        }
      },
      {
        content: nextLyric,
        style: {
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '26px',
          fontWeight: '400',
          color: '#dddddd',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '10px 28px',
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          maxWidth: '65%',
          lineHeight: 1.2,
          opacity: 0.8
        }
      }
    ]
  }
}

export const VisualizerPresets = {
  bars: {
    neon: (): BarsVisualizerConfig => ({
      windowInSeconds: 0.3,
      amplitude: 3.5,
      color: '#00ff88',
      smoothness: 1,
      glowEffect: true,
      reactivity: 1.8,
      symmetrical: false,
      gradientColors: ['#00ffd5', '#474aff'],
      barCount: 64,
      style: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '80%',
        filter: 'drop-shadow(0 0 20px rgba(0, 255, 213, 0.5))'
      }
    }),

    minimal: (): BarsVisualizerConfig => ({
      windowInSeconds: 0.4,
      amplitude: 2.0,
      color: '#ffffff',
      smoothness: 0.8,
      glowEffect: false,
      reactivity: 1.2,
      symmetrical: true,
      barCount: 32,
      style: {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%'
      }
    }),

    retro: (): BarsVisualizerConfig => ({
      windowInSeconds: 0.25,
      amplitude: 4.0,
      color: '#ff0080',
      smoothness: 0.6,
      glowEffect: true,
      reactivity: 2.2,
      symmetrical: false,
      gradientColors: ['#ff0080', '#8000ff', '#0080ff'],
      barCount: 128,
      style: {
        position: 'absolute',
        bottom: '-30%',
        left: '25%',
        filter: 'drop-shadow(0 0 15px rgba(255, 0, 128, 0.6))'
      }
    })
  },

  waveform: {
    smooth: (): WaveformVisualizerConfig => ({
      windowInSeconds: 0.5,
      amplitude: 2.5,
      color: '#4ecdc4',
      smoothness: 1.5,
      glowEffect: true,
      reactivity: 1.0,
      symmetrical: true,
      gradientColors: ['#4ecdc4', '#44a08d'],
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%'
      }
    }),

    electric: (): WaveformVisualizerConfig => ({
      windowInSeconds: 0.2,
      amplitude: 1.0,
      color: '#ffff00',
      smoothness: 0.3,
      glowEffect: true,
      reactivity: 1.5,
      symmetrical: false,
      gradientColors: ['#ffff00', '#ff8800', '#ff0000'],
      style: {
        position: 'absolute',
        bottom: '10%',
        left: '0',
        width: '100%',
        // height: '35%',
        filter: 'drop-shadow(0 0 25px rgba(255, 255, 0, 0.8))'
      }
    })
  },

  circular: {
    pulse: (): CircularVisualizerConfig => ({
      windowInSeconds: 0.3,
      amplitude: 3.0,
      color: '#ff6b6b',
      smoothness: 1.2,
      glowEffect: true,
      reactivity: 1.5,
      rotation: 0.5,
      gradientColors: ['#ff6b6b', '#feca57', '#48dbfb'],
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
        // width: '400px'
        // height: '400px'
      }
    })
  }
}

export const BackgroundPresets = {
  gradient: {
    sunset: (): StaticOrVideoBackgroundConfig => ({
      type: 'static',
      src: '',
      objectFit: 'cover',
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    }),

    neon: (): StaticOrVideoBackgroundConfig => ({
      type: 'static',
      src: '',
      objectFit: 'cover',
      style: {
        background: 'linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    }),

    dark: (): StaticOrVideoBackgroundConfig => ({
      type: 'static',
      src: '',
      objectFit: 'cover',
      style: {
        background: 'radial-gradient(circle at center, #2c3e50 0%, #1a252f 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    })
  }
}

export const SongInfoPresets = {
  bottomLeft: (coverImage: string, title: string, subtitle: string): SongInfoConfig => ({
    coverImage,
    title,
    subtitle,
    coverSize: '200px',
    style: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: '16px',
      borderRadius: '24px',
      backdropFilter: 'blur(10px)'
    },
    titleStyle: {
      fontWeight: '600',
      color: '#ffffff',
      margin: '0 0 4px 0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
    },
    subtitleStyle: {
      fontWeight: '400',
      color: '#cccccc',
      margin: '0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
    }
  }),

  topRight: (coverImage: string, title: string, subtitle: string): SongInfoConfig => ({
    coverImage,
    title,
    subtitle,
    coverSize: '280px',
    style: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '18px',
      borderRadius: '24px',
      backdropFilter: 'blur(8px)'
    },
    titleStyle: {
      fontWeight: '600',
      color: '#ffffff',
      margin: '0 0 2px 0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
    },
    subtitleStyle: {
      fontWeight: '400',
      color: '#dddddd',
      margin: '0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
    }
  }),

  center: (coverImage: string, title: string, subtitle: string): SongInfoConfig => ({
    coverImage,
    title,
    subtitle,
    coverSize: '240px',
    style: {
      position: 'absolute',
      top: '7%',
      right: '32%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      textAlign: 'center'
    },
    titleStyle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#ffffff',
      margin: '0 0 8px 0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      textShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
    },
    subtitleStyle: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#e0e0e0',
      margin: '0',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      textShadow: '0 0 15px rgba(0, 0, 0, 0.6)'
    }
  })
}

export const BuilderPresets = {
  neonNight: Builder.preset()
    .setBackground(BackgroundPresets.gradient.neon())
    .addVisualizer('bars', VisualizerPresets.bars.neon()),

  minimalClean: Builder.preset()
    .setBackground(BackgroundPresets.gradient.dark())
    .addVisualizer('bars', VisualizerPresets.bars.minimal())
    .addVisualizer('waveform', VisualizerPresets.waveform.smooth()),

  retroWave: Builder.preset()
    .setBackground(BackgroundPresets.gradient.sunset())
    .addVisualizer('bars', VisualizerPresets.bars.retro())
    .addVisualizer('circular', VisualizerPresets.circular.pulse()),

  lyricsOnly: {
    singleCenter: (lyric: string) =>
      Builder.preset().setBackground(BackgroundPresets.gradient.dark()).addLyric(LyricsPresets.single.center(lyric)),

    doubleStacked: (currentLyric: string, nextLyric: string) =>
      Builder.preset()
        .setBackground(BackgroundPresets.gradient.dark())
        .extend({
          lyrics: LyricsPresets.double.stacked(currentLyric, nextLyric)
        }),

    tripleCascade: (prevLyric: string, currentLyric: string, nextLyric: string) =>
      Builder.preset()
        .setBackground(BackgroundPresets.gradient.dark())
        .extend({
          lyrics: LyricsPresets.triple.cascade(prevLyric, currentLyric, nextLyric)
        })
  },

  visualizerOnly: {
    neonBars: Builder.preset()
      .setBackground(BackgroundPresets.gradient.neon())
      .addVisualizer('bars', VisualizerPresets.bars.neon()),

    smoothWaves: Builder.preset()
      .setBackground(BackgroundPresets.gradient.sunset())
      .addVisualizer('waveform', VisualizerPresets.waveform.smooth()),

    pulseCirle: Builder.preset()
      .setBackground(BackgroundPresets.gradient.dark())
      .addVisualizer('circular', VisualizerPresets.circular.pulse())
  }
}

export const ConfigPresets = {
  neonNight: (renderConfig: RenderConfig): VideoConfig => ({
    render: renderConfig,
    background: BackgroundPresets.gradient.neon(),
    visualizers: [{ ...VisualizerPresets.bars.neon(), type: 'bars' }],
    lyrics: [],
    songInfo: undefined
  }),

  minimalClean: (renderConfig: RenderConfig): VideoConfig => ({
    render: renderConfig,
    background: BackgroundPresets.gradient.dark(),
    visualizers: [
      { ...VisualizerPresets.bars.minimal(), type: 'bars' },
      { ...VisualizerPresets.waveform.smooth(), type: 'waveform' }
    ],
    lyrics: [],
    songInfo: undefined
  }),

  retroWave: (renderConfig: RenderConfig): VideoConfig => ({
    render: renderConfig,
    background: BackgroundPresets.gradient.sunset(),
    visualizers: [
      { ...VisualizerPresets.bars.retro(), type: 'bars' },
      { ...VisualizerPresets.circular.pulse(), type: 'circular' }
    ],
    lyrics: [],
    songInfo: undefined
  })
}
