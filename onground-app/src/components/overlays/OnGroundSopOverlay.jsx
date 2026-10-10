import { on } from '../../utils/on';

/**
 * OnGroundSopOverlay
 * On-ground Call — Lead SOP checklist, shown before the call connects
 *
 * Static markup converted 1:1 from the original HTML (id: onGroundSopOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function OnGroundSopOverlay() {
  return (
    <div className="ios-overlay" id="onGroundSopOverlay" style={{alignItems:"flex-end"}}>
      <div className="sop-check-overlay-card">
        <div className="sop-check-head">
          <div className="sop-check-head-top">
            <div className="sop-check-lead-av" id="sopCheckAv">
              MK
            </div>
            <div style={{flex:"1"}}>
              <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}} id="sopCheckName">
                Before you call Mukunda
              </div>
              <div style={{fontSize:"13px",color:"rgba(255,255,255,.7)"}}>
                Lead SOP parameters · review, then place the call
              </div>
            </div>
            <button onClick={on(function(event){closeOnGroundSop()
})} title="Close" style={{background:"rgba(255,255,255,.16)",border:"none",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"15px",cursor:"pointer",flexShrink:"0"}}>
              ✕
            </button>
          </div>
        </div>
        <div className="sop-check-body" id="sopCheckBody" />
        <div className="sop-check-footer">
          <button className="sop-check-proceed-btn" id="sopCheckProceedBtn" onClick={on(function(event){proceedOnGroundCall()
})}>
            <i className="ti ti-phone-outgoing" />
            Skip · Place the call
          </button>
          <div className="sop-check-skip-note">
            These are the same Lead SOP checkpoints your manager set — reviewing them takes 10 seconds and keeps the call on-target.
          </div>
        </div>
      </div>
    </div>
  );
}
