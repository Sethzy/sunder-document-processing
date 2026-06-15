/**
 * Document split/categorization animation using Remotion Player.
 * Shows documents being organized into RECORDS/STATEMENTS/PROCEDURES categories.
 * Used in PrimaryFeatures section.
 */
import { Player } from '@remotion/player'
import { ActDocumentSplit } from '@/components/remotion/ActDocumentSplit'

export function DocumentSplitAnimation() {
  return (
    <Player
      component={ActDocumentSplit}
      durationInFrames={210}
      fps={30}
      compositionWidth={1000}
      compositionHeight={635}
      style={{
        width: '100%',
      }}
      loop
      autoPlay
      acknowledgeRemotionLicense
    />
  )
}
