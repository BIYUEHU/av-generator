import { Composition, registerRoot } from 'remotion'
import { Template } from '../types/common'
import { VideoConfig } from '../types/config'
import { calculateDurationInFrames } from './common'

export function bootstrap(template: Template, config: VideoConfig): void {
  registerRoot(() => (
    <Composition
      id={config.render?.title ?? 'MusicVideo'}
      component={template}
      width={config.render?.width ?? 1920}
      height={config.render?.height ?? 1080}
      defaultProps={config}
      calculateMetadata={async ({ props }) => ({
        durationInFrames: await calculateDurationInFrames(props.render.audio),
        fps: config.render?.fps ?? 30
      })}
    />
  ))
}
