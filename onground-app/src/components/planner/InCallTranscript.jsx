import { on } from '../../utils/on';

/**
 * InCallTranscript
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function InCallTranscript() {
  return (
    <div style={{flex:"1",minWidth:"0"}}>
      <div id="dialerActiveCall" style={{display:"none",background:"linear-gradient(135deg,#0a2e1a,#0f6e56)",margin:"12px",borderRadius:"16px",padding:"16px",color:"#fff",textAlign:"center"}}>
        <div style={{fontSize:"12.5px",color:"#a8dcc4",textTransform:"uppercase",letterSpacing:".5px",marginBottom:"4px"}}>
          Call in progress
        </div>
        <div style={{fontSize:"17px",fontWeight:"800",marginBottom:"2px"}} id="dialerActiveName">
          Mukunda R.
        </div>
        <div style={{fontSize:"22px",fontWeight:"800",fontVariantNumeric:"tabular-nums",marginBottom:"10px"}} id="dialerActiveTimer">
          00:00
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"14px"}}>
          <span style={{fontSize:"12.5px",color:"#c9ede0"}}>
            Sentiment
          </span>
          <div style={{width:"70px",height:"5px",borderRadius:"3px",background:"rgba(255,255,255,.18)",overflow:"hidden"}}>
            <div id="sentimentFill" style={{width:"65%",height:"100%",background:"#5dcaa5",borderRadius:"3px",transition:"width .6s ease,background .6s ease"}} />
          </div>
          <span id="sentimentLabel" style={{fontSize:"12.5px",fontWeight:"700",color:"#5dcaa5"}}>
            Positive
          </span>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"14px"}}>
          <button onClick={on(function(event){dialerToggleMute(this)
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",cursor:"pointer"}}>
            <i className="ti ti-microphone-off" style={{fontSize:"18px"}} />
          </button>
          {" "}
          <button onClick={on(function(event){dialerToggleHold(this)
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",cursor:"pointer"}}>
            <i className="ti ti-player-pause" style={{fontSize:"18px"}} />
          </button>
          {" "}
          <button onClick={on(function(event){dialerEndCall()
})} style={{width:"46px",height:"46px",borderRadius:"50%",background:"#e24b4a",border:"none",color:"#fff",cursor:"pointer"}}>
            <i className="ti ti-phone-x" style={{fontSize:"18px"}} />
          </button>
        </div>
      </div>
      {/* LIVE TRANSCRIPT — streams in while the call is active, speaker-labeled; this is what AI Assist's nudges and live summary are actually grounded in, not a disconnected suggestion box. Now the full-height left column, not squeezed above AI Assist. */}
      <div id="dialerLiveTranscript" style={{display:"none",margin:"0 12px 12px",background:"#12151c",borderRadius:"16px",border:"1px solid #262b38",overflow:"hidden"}}>
        <div style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:"7px",borderBottom:"1px solid #262b38"}}>
          <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#5dcaa5",animation:"blink 1.2s ease-in-out infinite"}} />
          {" "}
          <span style={{fontSize:"12.5px",fontWeight:"800",color:"#e5e5ea",textTransform:"uppercase",letterSpacing:".4px"}}>
            Live transcript
          </span>
        </div>
        <div id="transcriptLines" style={{padding:"12px 14px",maxHeight:"480px",minHeight:"220px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"9px"}} />
      </div>
    </div>
  );
}
