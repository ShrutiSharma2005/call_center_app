import { on } from '../../utils/on';
import AssessHistoryDrawer from './AssessHistoryDrawer';
import AssessPanel from './AssessPanel';

/**
 * AvaniSplitArea
 * ── Assess layout: full-width chat + collapsible history drawer ───
 *
 * Static markup converted 1:1 from the original HTML (id: avani-split-area).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AvaniSplitArea() {
  return (
    <div id="avani-split-area" style={{display:"none",flexDirection:"column",height:"calc(100% - 118px)",background:"#f7f7f5",position:"relative"}}>
      {/* HISTORY DRAWER BACKDROP */}
      <div id="assess-history-backdrop" style={{display:"none",position:"absolute",inset:"0",background:"rgba(0,0,0,.35)",zIndex:"50",opacity:"0",transition:"opacity .25s"}} onClick={on(function(event){closeAssessHistory()
})} />
      {/* HISTORY DRAWER (slides in from left) */}
      <AssessHistoryDrawer />
      {/* FULL-WIDTH: Assess chat panel */}
      <AssessPanel />
    </div>
  );
}
