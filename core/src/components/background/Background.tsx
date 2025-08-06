import React from 'react'
import { BackgroundConfig } from '../../types/config'
import { CarouselBackground } from './CarouselBackground'
import { StaticBackground } from './StaticBackground'
import { VideoBackground } from './VideoBackground'

export const Background: React.FC<{ config: BackgroundConfig }> = ({ config }) => {
  switch (config.type) {
    case 'staticImage':
      return <StaticBackground src={config.src} style={config.style} />
    case 'video':
      return <VideoBackground src={config.src} style={config.style} />
    case 'carousel':
      return (
        <CarouselBackground
          images={config.images}
          framesPerImage={config.framesPerImage}
          fadeFrames={config.fadeFrames}
        />
      )
  }
}
