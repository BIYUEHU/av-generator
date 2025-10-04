// SakuraFalling.tsx

import { motion } from 'framer-motion'
import { AbsoluteFill, random, useVideoConfig } from 'remotion'

type SakuraFallingProps = {
  petalCount?: number // 花瓣数量
  minSize?: number // 花瓣最小尺寸
  maxSize?: number // 花瓣最大尺寸
  minDuration?: number // 最小飘落时长（秒）
  maxDuration?: number // 最大飘落时长（秒）
  swing?: number // 左右摆动幅度（像素）
  colors?: string[] // 花瓣颜色渐变
}

const SakuraPetal: React.FC<{
  index: number
  config: Required<SakuraFallingProps>
}> = ({ index, config }) => {
  const { width, height } = useVideoConfig()
  const seed = index * 999

  // 随机初始位置
  const startX = random(seed) * width
  const startY = -50

  // 随机落点（加上 swing 摆动）
  const totalSec = config.minDuration + random(seed + 1) * (config.maxDuration - config.minDuration)
  // const totalFrames = totalSec * fps

  const endY = height + 50
  const size = config.minSize + random(seed + 2) * (config.maxSize - config.minSize)

  // 随机颜色
  const color = config.colors[Math.floor(random(seed + 3) * config.colors.length)]

  // 花瓣左右摇摆（基于正弦曲线）
  const swing = config.swing * (0.5 + random(seed + 4))

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        rotate: random(seed + 5) * 360,
        opacity: 0
      }}
      animate={{
        x: [startX, startX + swing, startX - swing, startX + swing / 2, startX],
        y: [startY, endY],
        rotate: [0, 360 * (random(seed + 6) > 0.5 ? 1 : -1)],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: totalSec,
        ease: 'easeInOut',
        repeat: Infinity,
        delay: random(seed + 7) * totalSec
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size * 0.6,
        background: `radial-gradient(circle at 30% 30%, ${color}, #ff69b4)`,
        borderRadius: '50% 50% 50% 50%',
        boxShadow: '0 0 10px rgba(255,192,203,0.4)'
      }}
    />
  )
}

export const SakuraFalling: React.FC<SakuraFallingProps> = ({
  petalCount = 30,
  minSize = 15,
  maxSize = 35,
  minDuration = 6,
  maxDuration = 24,
  swing = 50,
  colors = ['#ffc0cb', '#ffb6c1', '#d37ea8ff']
}) => {
  const config = { petalCount, minSize, maxSize, minDuration, maxDuration, swing, colors }
  return (
    <AbsoluteFill>
      {new Array(petalCount).fill(0).map((_, i) => (
        <SakuraPetal key={i} index={i} config={config} />
      ))}
    </AbsoluteFill>
  )
}
