import { on } from '../../utils/on';

/**
 * CallWrapupOverlay
 * CALL WRAP-UP — auto-drafted AI summary + outcome tag, logged to Recent Calls and the lead's notes on save. This was the missing piece vs. best-in-class call-centre tools (Dialpad/Five9/ Nextiva all auto-summarize and push to CRM instead of relying on manual agent notes).
 *
 * Static markup converted 1:1 from the original HTML (id: callWrapupOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function CallWrapupOverlay() {
  return (
    <div className="ios-overlay" id="callWrapupOverlay" style={{zIndex:"410"}}>
      <div className="ios-sheet" style={{position:"relative"}}>
        <div className="ios-sheet-handle" />
        <button className="sheet-close-btn" onClick={on(function(event){skipCallWrapup()
})}>
          ✕
        </button>
        <div className="ios-sheet-inner">
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
            <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
              <i className="ti ti-phone-check" style={{fontSize:"17px",color:"#0f6e56"}} />
            </div>
            <div>
              <div className="ios-sheet-title" style={{margin:"0"}} id="wrapupName">
                Call wrapped up
              </div>
              <div className="ios-sheet-sub" id="wrapupMeta">
                —
              </div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"6px",margin:"14px 0 6px"}}>
            <i className="ti ti-sparkles" style={{fontSize:"14.5px",color:"#7c3aed"}} />
            {" "}
            <span style={{fontSize:"13px",fontWeight:"700",color:"#7c3aed",textTransform:"uppercase",letterSpacing:".4px"}}>
              AI-drafted summary — edit if needed
            </span>
          </div>
          <textarea id="wrapupSummary" style={{width:"100%",minHeight:"64px",border:"1.5px solid #e5e5ea",borderRadius:"12px",padding:"10px 11px",fontSize:"14px",fontFamily:"inherit",color:"#1a1a1a",lineHeight:"1.5",resize:"vertical",boxSizing:"border-box"}} />
          <div style={{fontSize:"13px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px",margin:"12px 0 6px"}}>
            Outcome
          </div>
          <div id="wrapupOutcomeRow" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"6px"}} />
          <div className="ios-btn-row" style={{marginTop:"14px"}}>
            <button className="ios-btn-secondary" onClick={on(function(event){skipCallWrapup()
})}>
              Skip
            </button>
            {" "}
            <button onClick={on(function(event){saveCallWrapup()
})} style={{flex:"1",padding:"13px",border:"none",borderRadius:"100px",fontSize:"14.5px",color:"#fff",background:"#0f6e56",cursor:"pointer",fontWeight:"600"}}>
              <i className="ti ti-database-export" style={{fontSize:"15px",verticalAlign:"-2px",marginRight:"5px"}} />
              Save to CRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
