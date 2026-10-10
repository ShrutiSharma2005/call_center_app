import { on } from '../../utils/on';

/**
 * AiAssistColumn
 * AI Assist — live, in-call suggested answer + quick replies + rich case history (Nextiva-style AI fallback). Right-hand panel, own scroll, only appears once dialerAiAssist is shown (call in progress).
 *
 * Static markup converted 1:1 from the original HTML (id: dialerAiAssistCol).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AiAssistColumn() {
  return (
    <div id="dialerAiAssistCol" style={{display:"none",width:"380px",flexShrink:"0",maxHeight:"640px",overflowY:"auto",margin:"12px 12px 12px 0"}}>
      <div id="dialerAiAssist" style={{display:"none",background:"#fff",borderRadius:"18px",border:"1px solid #e5e5ea",boxShadow:"0 4px 20px rgba(76,29,149,.1)",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(120deg,#4c1d95,#6d28d9 60%,#8b5cf6)",padding:"12px 16px",display:"flex",alignItems:"center",gap:"9px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"-30%",right:"-5%",width:"140px",height:"140px",background:"radial-gradient(circle,rgba(255,255,255,.16),transparent 70%)",pointerEvents:"none"}} />
          <div style={{width:"28px",height:"28px",borderRadius:"9px",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
            <i className="ti ti-sparkles" style={{color:"#fff",fontSize:"16px"}} />
          </div>
          <span style={{fontSize:"15px",fontWeight:"800",color:"#fff",position:"relative",zIndex:"1"}}>
            AI Assist
          </span>
          {" "}
          <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"4px",fontSize:"12.5px",color:"#fff",fontWeight:"800",textTransform:"uppercase",letterSpacing:".4px",background:"rgba(255,255,255,.16)",padding:"4px 9px",borderRadius:"20px",position:"relative",zIndex:"1"}}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#5dcaa5",animation:"blink 1.2s ease-in-out infinite"}} />
            Live
          </span>
        </div>
        <div id="aiAssistGamifyStrip" style={{display:"none",alignItems:"center",gap:"14px",padding:"9px 16px",background:"linear-gradient(120deg,#0a1a14,#0f3d2f 55%,#0f6e56)",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
          <i className="ti ti-trophy" style={{fontSize:"16px",color:"#FFD700",flexShrink:"0"}} />
          <div style={{display:"flex",gap:"18px",flex:"1"}}>
            <div>
              <span id="aiGamifyValue" style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                ₹—
              </span>
              <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                unlock
              </span>
            </div>
            <div>
              <span id="aiGamifyPts" style={{fontSize:"15px",fontWeight:"800",color:"#FFD700"}}>
                +—
              </span>
              <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                OG Score™
              </span>
            </div>
            <div>
              <span id="aiGamifyRank" style={{fontSize:"15px",fontWeight:"800",color:"#fff"}}>
                #—
              </span>
              <span style={{fontSize:"12.5px",color:"#9fe1cb",fontWeight:"600",marginLeft:"4px"}}>
                rank if closed
              </span>
            </div>
          </div>
        </div>
        {/* What to sell — the main objective for this call, shown first (before the SOP checklist) so the agent sees what to pitch/cross-sell/offer before anything else. */}
        <div style={{padding:"13px 16px 4px"}}>
          <div style={{fontSize:"12.5px",fontWeight:"800",color:"#a3660a",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"5px"}}>
            <i className="ti ti-target-arrow" style={{fontSize:"14.5px"}} />
            Main objective — what to offer
          </div>
          <div id="aiAssistPreCall" />
        </div>
        {/* SOP checklist for THIS call — fills live as the transcript hits each item; a nudge appears here only when the call is actually drifting off-SOP, never randomly. */}
        <div style={{padding:"9px 16px 4px"}}>
          <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"5px"}}>
            <i className="ti ti-checklist" style={{fontSize:"14.5px",color:"#7c3aed"}} />
            SOP checklist — this call
          </div>
          <div id="liveSopChecklist" style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"4px"}} />
          <div id="sopNudgeBox" style={{display:"none",marginTop:"9px",background:"linear-gradient(120deg,#fff8e1,#fffbf0)",border:"1px solid #f5cf94",borderRadius:"11px",padding:"10px 12px"}} />
        </div>
        <div style={{padding:"10px 16px 14px"}}>
          {/* Ask AI — was a single static "Suggested Answer" box that looked random with no way to act on it; now a real search input so the agent can ask anything mid-call and get a live, grounded answer instead of just reading a canned suggestion. */}
          <div style={{fontSize:"12.5px",fontWeight:"700",color:"#6d28d9",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"6px",display:"flex",alignItems:"center",gap:"5px"}}>
            <i className="ti ti-message-chatbot" style={{fontSize:"14.5px"}} />
            Ask AI about this call
          </div>
          <div style={{display:"flex",gap:"6px",marginBottom:"9px"}}>
            <input id="aiAssistAskInput" type="text" placeholder="e.g. what's our return policy? has he mentioned budget?" style={{flex:"1",fontSize:"13.5px",color:"#1a1a1a",background:"#faf9f6",border:"1px solid #e4d9fc",borderRadius:"10px",padding:"9px 12px",fontFamily:"inherit"}} onKeyDown={on(function(event){if(event.key==='Enter'){event.preventDefault();aiAssistAsk();}
})} />
            {" "}
            <button onClick={on(function(event){aiAssistAsk()
})} style={{background:"#6d28d9",color:"#fff",border:"none",borderRadius:"10px",padding:"0 14px",cursor:"pointer",display:"flex",alignItems:"center"}}>
              <i className="ti ti-send" style={{fontSize:"16px"}} />
            </button>
          </div>
          <div id="aiAssistSuggested" style={{fontSize:"15px",color:"#1a1a1a",lineHeight:"1.55",background:"linear-gradient(120deg,#f7f4ff,#f1ecff)",border:"1px solid #e4d9fc",borderRadius:"12px",padding:"11px 13px",marginBottom:"12px",fontWeight:"500"}} />
          <div id="aiAssistQuickReplies" style={{display:"flex",gap:"7px",flexWrap:"wrap",marginBottom:"16px"}} />
          <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"8px"}}>
            <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px"}}>
              <i className="ti ti-notes" style={{fontSize:"13.5px",color:"#7c3aed",verticalAlign:"-1px",marginRight:"3px"}} />
              Summary, drafting as you talk
            </div>
          </div>
          <div id="liveSummaryBox" style={{fontSize:"14px",color:"#4b4b52",lineHeight:"1.55",background:"#faf9f6",border:"1px dashed #ddd6ea",borderRadius:"11px",padding:"10px 12px",marginBottom:"16px",minHeight:"20px"}} />
          <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
            <div style={{fontSize:"12.5px",fontWeight:"800",color:"#3a3a42",textTransform:"uppercase",letterSpacing:".4px"}}>
              📋 Case History
            </div>
          </div>
          <div id="aiAssistCaseHistory" />
        </div>
      </div>
    </div>
  );
}
