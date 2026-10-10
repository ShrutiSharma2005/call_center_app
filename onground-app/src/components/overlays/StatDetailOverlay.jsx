import { on } from '../../utils/on';

/**
 * StatDetailOverlay
 * Stat detail sheet — replaces the 4 KPI cards that used to sit below the banner; now reached by tapping a banner metric
 *
 * Static markup converted 1:1 from the original HTML (id: statDetailOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function StatDetailOverlay() {
  return (
    <div className="ios-overlay" id="statDetailOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeStatDetail()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner" id="statDetailBody" style={{padding:"18px 20px 24px"}} />
      </div>
    </div>
  );
}
