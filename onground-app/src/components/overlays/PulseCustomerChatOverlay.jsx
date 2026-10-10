import { on } from '../../utils/on';

/**
 * PulseCustomerChatOverlay
 * Customer-facing chat overlay (WhatsApp + Voice Call channel selector)
 *
 * Static markup converted 1:1 from the original HTML (id: pulseCustomerChatOverlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseCustomerChatOverlay() {
  return (
    <div id="pulseCustomerChatOverlay" style={{position:"absolute",inset:"0",background:"#e9edf1",zIndex:"310",display:"none",flexDirection:"column"}}>
      <div style={{background:"#075e54",padding:"10px 12px",display:"flex",alignItems:"center",gap:"9px",flexShrink:"0",boxShadow:"0 2px 8px rgba(0,0,0,.15)"}}>
        <button onClick={on(function(event){closePulseCustomerChat()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div id="pccAvatar" style={{width:"32px",height:"32px",borderRadius:"50%",background:"#0f6e56",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13.5px",fontWeight:"700",flexShrink:"0"}}>
          MK
        </div>
        <div style={{flex:"1",minWidth:"0"}}>
          <div id="pccName" style={{fontSize:"14.5px",fontWeight:"700",color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            Mukunda
          </div>
          <div id="pccSub" style={{fontSize:"12.5px",color:"rgba(255,255,255,.65)"}}>
            +91 98765 43210 · Hot Lead
          </div>
        </div>
        <button onClick={on(function(event){pulseStartCall()
})} style={{background:"rgba(255,255,255,.15)",border:"none",width:"30px",height:"30px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <i className="ti ti-phone" style={{color:"#fff",fontSize:"15px"}} />
        </button>
        {" "}
        <button onClick={on(function(event){openPulseTagSheet()
})} style={{background:"rgba(255,255,255,.15)",border:"none",width:"30px",height:"30px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <i className="ti ti-user-plus" style={{color:"#fff",fontSize:"15px"}} />
        </button>
      </div>
      {/* Unanswered strip, shown only for missed-call threads */}
      <div id="pccUnansweredStrip" style={{display:"none",background:"#fff3cd",padding:"6px 12px",fontSize:"13px",color:"#7c4a00",fontWeight:"600",textAlign:"center",borderBottom:"1px solid #f3dfa8"}}>
        <i className="ti ti-phone-x" style={{fontSize:"13.5px",verticalAlign:"-1px",marginRight:"3px"}} />
        Missed this call — call back or reply to keep SLA{" "}
      </div>
      <div id="pccMessages" style={{flex:"1",overflowY:"auto",padding:"12px 14px",background:"#e9edf1",backgroundImage:"radial-gradient(#d7dee3 1px,transparent 1px)",backgroundSize:"14px 14px"}} />
      {/* Channel selector + compose */}
      <div style={{background:"#fff",borderTop:"0.5px solid #e5e5ea",flexShrink:"0"}}>
        <div style={{display:"flex",padding:"6px 10px 0",gap:"6px"}}>
          <div id="pccChanWa" onClick={on(function(event){pulseSetChannel('wa')
})} style={{flex:"1",textAlign:"center",padding:"6px 0",borderRadius:"8px 8px 0 0",fontSize:"12.5px",fontWeight:"700",color:"#0f6e56",background:"#dcf8c6",cursor:"pointer"}}>
            💬 WhatsApp
          </div>
          <div id="pccChanCall" onClick={on(function(event){pulseSetChannel('call')
})} style={{flex:"1",textAlign:"center",padding:"6px 0",borderRadius:"8px 8px 0 0",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",background:"#f2f2f7",cursor:"pointer"}}>
            📞 Voice Call
          </div>
        </div>
        <div id="pccComposeWa" style={{padding:"8px 10px 10px",display:"flex",gap:"8px",alignItems:"flex-end"}}>
          <div style={{flex:"1",background:"#f2f2f7",borderRadius:"20px",padding:"8px 12px",minHeight:"36px",display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"13.5px",color:"#8e8e93"}} id="pccInput" suppressContentEditableWarning contentEditable="true">
              Message on WhatsApp…
            </span>
          </div>
          <button onClick={on(function(event){sendPulseCustomerMsg()
})} style={{width:"34px",height:"34px",borderRadius:"50%",background:"#1d9e75",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:"0"}}>
            <i className="ti ti-send" style={{fontSize:"15px",color:"#fff"}} />
          </button>
        </div>
        <div id="pccComposeCall" style={{display:"none",padding:"10px 14px 14px",textAlign:"center"}}>
          <div style={{fontSize:"13px",color:"#8e8e93",marginBottom:"8px"}}>
            Switch to voice — this logs as an on-ground call on this lead
          </div>
          <button onClick={on(function(event){pulseStartCall()
})} style={{border:"none",borderRadius:"100px",padding:"10px 22px",fontSize:"14px",fontWeight:"700",color:"#fff",background:"#1d9e75",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"6px"}}>
            <i className="ti ti-phone-call" />
            Start On-ground Call
          </button>
        </div>
      </div>
    </div>
  );
}
