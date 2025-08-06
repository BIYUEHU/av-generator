import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion'

export const CarouselBackground: React.FC<{
  images: string[]
  framesPerImage: number
  fadeFrames: number
}> = ({ images, framesPerImage, fadeFrames }) => {
  const frame = useCurrentFrame()
  const cycle = framesPerImage * images.length
  const frameInCycle = frame % cycle
  const idx = Math.floor(frameInCycle / framesPerImage)
  const next = (idx + 1) % images.length
  const rel = frameInCycle - idx * framesPerImage

  const opacityCurrent = interpolate(rel, [0, fadeFrames, framesPerImage - fadeFrames, framesPerImage], [1, 1, 0, 0])

  const opacityNext = interpolate(rel, [0, fadeFrames, framesPerImage - fadeFrames, framesPerImage], [0, 0, 1, 1])

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: opacityCurrent }}>
        <Img src={images[idx]} style={{ width: '100%' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: opacityNext }}>
        <Img src={images[next]} style={{ width: '100%' }} />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
