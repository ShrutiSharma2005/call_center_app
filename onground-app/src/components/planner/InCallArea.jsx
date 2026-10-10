import AiAssistColumn from './AiAssistColumn';
import InCallTranscript from './InCallTranscript';

/**
 * InCallArea
 * Side-by-side during a call: transcript gets the left column at full height, AI Assist is a fixed-width right panel — so the transcript is never squeezed by AI Assist stacking below it.
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function InCallArea() {
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:"0"}}>
      <InCallTranscript />
      {/* AI Assist — live, in-call suggested answer + quick replies + rich case history (Nextiva-style AI fallback). Right-hand panel, own scroll, only appears once dialerAiAssist is shown (call in progress). */}
      <AiAssistColumn />
    </div>
  );
}
