import { on } from '../../utils/on';

/**
 * CalShareOverlay
 * Calendar invite share picker — share with Manager / Team / a specific Pulse member
 *
 * Static markup converted 1:1 from the original HTML (id: calShareOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function CalShareOverlay() {
  return (
    <div className="ios-overlay" id="calShareOverlay">
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){closeCalShareInvite()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner" style={{padding:"18px 20px 24px"}}>
          <div className="ios-sheet-title">
            Share invite
          </div>
          <div className="ios-sheet-sub" id="calShareTitle" style={{marginBottom:"14px"}}>
            —
          </div>
          <div id="calShareOptionsList" />
          <button onClick={on(function(event){calConfirmShare()
})} style={{width:"100%",marginTop:"8px",padding:"11px",border:"none",borderRadius:"10px",fontSize:"14.5px",fontWeight:"700",color:"#fff",background:"linear-gradient(135deg,#4c1d95,#6d28d9)",cursor:"pointer"}}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
