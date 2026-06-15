/**
 * Document processing animation using Remotion Player.
 * Embeds the Act4DocumentProcessing scene as a looping animation.
 */
import { Player } from '@remotion/player'
import { Act4DocumentProcessing } from '@/components/remotion/Act4DocumentProcessing'

export function DocumentProcessingAnimation() {
  return (
    <Player
      component={Act4DocumentProcessing}
      durationInFrames={210}
      fps={30}
      compositionWidth={1400}
      compositionHeight={650}
      style={{
        width: '100%',
      }}
      loop
      autoPlay
      acknowledgeRemotionLicense
    />
  )
}
