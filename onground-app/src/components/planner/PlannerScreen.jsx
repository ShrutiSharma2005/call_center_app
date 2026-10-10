import { on } from '../../utils/on';
import CallWrapupOverlay from './CallWrapupOverlay';
import InCallArea from './InCallArea';
import PlanPanels from './PlanPanels';

/**
 * PlannerScreen
 * PLANNER — Incoming / Outgoing / Recent calling plan (was: Call Queue / Live Dialer)
 *
 * Static markup converted 1:1 from the original HTML (id: asc-calls, class: sc).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PlannerScreen() {
  return (
    <div className="sc" id="asc-calls">
      <div style={{padding:"14px 16px 12px",background:"linear-gradient(135deg,#1a1a2e,#2d2d5f)",borderRadius:"0 0 18px 18px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div className="cc-greeting">
              Today's calling plan
            </div>
            <div className="cc-name" style={{fontSize:"17px"}}>
              Planner
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div id="planDateLabel" style={{fontSize:"13.5px",fontWeight:"800",color:"#fff",background:"rgba(255,255,255,.12)",padding:"5px 10px",borderRadius:"9px"}} />
          </div>
        </div>
      </div>
      <div id="dialerIncomingCall" style={{display:"none",background:"linear-gradient(135deg,#7c2d12,#c2410c)",margin:"12px",borderRadius:"16px",padding:"16px",color:"#fff",textAlign:"center",animation:"incomingPulse 1.4s ease-in-out infinite"}}>
        <div style={{fontSize:"12.5px",color:"#fed7aa",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
          Incoming call
        </div>
        <div style={{fontSize:"17px",fontWeight:"800",marginBottom:"2px"}} id="dialerIncomingName">
          Ritu S.
        </div>
        <div style={{fontSize:"12.5px",color:"#fed7aa",marginBottom:"14px"}} id="dialerIncomingSub">
          🎯 Intent 96 · calling from +91 98450 xxxxx
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"22px"}}>
          <button onClick={on(function(event){dialerDeclineIncoming()
})} style={{width:"52px",height:"52px",borderRadius:"50%",background:"#e24b4a",border:"none",color:"#fff",cursor:"pointer"}}>
            <i className="ti ti-phone-x" style={{fontSize:"20px"}} />
          </button>
          {" "}
          <button onClick={on(function(event){dialerAcceptIncoming()
})} style={{width:"52px",height:"52px",borderRadius:"50%",background:"#1d9e75",border:"none",color:"#fff",cursor:"pointer",animation:"acceptPulse 1s ease-in-out infinite"}}>
            <i className="ti ti-phone" style={{fontSize:"20px"}} />
          </button>
        </div>
      </div>
      {/* Side-by-side during a call: transcript gets the left column at full height, AI Assist is a fixed-width right panel — so the transcript is never squeezed by AI Assist stacking below it. */}
      <InCallArea />
      <PlanPanels />
      <div onClick={on(function(event){dialerToggleKeypad()
})} style={{position:"fixed",bottom:"24px",right:"24px",width:"54px",height:"54px",borderRadius:"50%",background:"linear-gradient(135deg,#4338ca,#6d28d9)",boxShadow:"0 6px 20px rgba(67,56,202,.45)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:"50"}}>
        <i className="ti ti-dialpad" style={{fontSize:"22px",color:"#fff"}} />
      </div>
      <div id="dialerKeypadSheet" style={{display:"none",position:"fixed",inset:"0",background:"rgba(0,0,0,.4)",zIndex:"400",alignItems:"flex-end",justifyContent:"center"}} onClick={on(function(event){if(event.target===this)dialerToggleKeypad()
})}>
        <div style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:"16px",width:"100%",maxWidth:"360px"}}>
          <div style={{width:"36px",height:"4px",background:"#e5e5ea",borderRadius:"2px",margin:"0 auto 14px"}} />
          <input id="dialerNumberDisplay" readOnly style={{width:"100%",textAlign:"center",fontSize:"24px",fontWeight:"700",color:"#1a1a1a",border:"none",outline:"none",marginBottom:"14px"}} />
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}} id="dialerKeypadGrid" />
          <button onClick={on(function(event){dialerStartCall()
})} style={{width:"56px",height:"56px",borderRadius:"50%",background:"#0f6e56",border:"none",color:"#fff",margin:"16px auto 0",display:"block",cursor:"pointer"}}>
            <i className="ti ti-phone" style={{fontSize:"20px"}} />
          </button>
        </div>
      </div>
      {/* CALL WRAP-UP — auto-drafted AI summary + outcome tag, logged to Recent Calls and the lead's notes on save. This was the missing piece vs. best-in-class call-centre tools (Dialpad/Five9/ Nextiva all auto-summarize and push to CRM instead of relying on manual agent notes). */}
      <CallWrapupOverlay />
      {/* SOP REVIEW — opened from a Recent call row; checklist mirrors the manager's Calling Channel Analysis script-adherence items (Settings → Customer Growth Preferences → SOP Template Questions, Call Centre channel), scored against this specific call. */}
      <div className="ios-overlay" id="callSopOverlay" style={{zIndex:"415"}}>
        <div className="ios-sheet" style={{position:"relative",maxHeight:"84vh"}}>
          <div className="ios-sheet-handle" />
          <button className="sheet-close-btn" onClick={on(function(event){closeCallSopReview()
})}>
            ✕
          </button>
          <div className="ios-sheet-inner">
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
              <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#f1ecff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
                <i className="ti ti-checklist" style={{fontSize:"17px",color:"#7c3aed"}} />
              </div>
              <div>
                <div className="ios-sheet-title" style={{margin:"0"}} id="sopReviewName">
                  Call SOP review
                </div>
                <div className="ios-sheet-sub" id="sopReviewMeta">
                  —
                </div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"8px",background:"#faf9f6",borderRadius:"12px",padding:"11px 13px",margin:"12px 0"}} id="sopReviewScoreBar" />
            <div id="sopReviewList" />
          </div>
        </div>
      </div>
    </div>
  );
}
