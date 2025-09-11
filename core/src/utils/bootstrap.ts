import { registerRoot } from 'remotion'
import { Template } from '../types/common'
import { VideoConfig } from '../types/config'
import { setup } from './setup'

export function bootstrap(template: Template, config: VideoConfig): void {
  registerRoot(() => setup(template, config))
}
