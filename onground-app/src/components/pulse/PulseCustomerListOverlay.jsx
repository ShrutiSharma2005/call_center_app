import { on } from '../../utils/on';

/**
 * PulseCustomerListOverlay
 * CUSTOMER DISCUSSIONS OVERLAY — opened from the "#customer-discussions" channel row
 *
 * Static markup converted 1:1 from the original HTML (id: pulseCustomerListOverlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseCustomerListOverlay() {
  return (
    <div id="pulseCustomerListOverlay" style={{position:"absolute",inset:"0",background:"#eceef4",zIndex:"325",display:"none",flexDirection:"column"}}>
      <div style={{background:"linear-gradient(135deg,#0f6e56,#128C7E)",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
        <button onClick={on(function(event){closePulseCustomerList()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
            💬 customer-discussions
          </div>
          <div style={{fontSize:"12.5px",color:"#c9f7d8"}}>
            Relayed via WhatsApp Business · 2 open
          </div>
        </div>
      </div>
      <div id="ppanel-external" style={{paddingBottom:"80px",flex:"1",overflowY:"auto"}}>
        <div id="pulseUnansweredBanner" style={{margin:"8px 12px 2px",background:"#fff3cd",border:"1px solid #f3dfa8",borderRadius:"10px",padding:"8px 10px",display:"flex",alignItems:"center",gap:"7px",cursor:"pointer"}} onClick={on(function(event){openPulseCustomerChat('Ali','AL','+91 90000 11122','missedcall')
})}>
          <i className="ti ti-phone-x" style={{fontSize:"16px",color:"#c8860a"}} />
          <div style={{flex:"1",fontSize:"12.5px",color:"#7c4a00",fontWeight:"600"}}>
            1 unanswered call &amp; 1 unreplied chat need attention
          </div>
          <i className="ti ti-chevron-right" style={{fontSize:"14.5px",color:"#c8860a"}} />
        </div>
        <div style={{padding:"10px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}} id="custConvHeader">
          Customer Conversations
        </div>
        <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Mukunda','MK','+91 98765 43210','customer')
})}>
          <div className="ios-av ios-av-teal" style={{fontSize:"16px"}}>
            MK
          </div>
          <div className="ios-cm">
            <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
              Mukunda{" "}
              <span style={{fontSize:"12.5px",background:"#dcf8c6",color:"#075e54",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                WA
              </span>
            </div>
            <div className="ios-cp">
              Quote for Ortho GRID sent · awaiting reply
            </div>
          </div>
          <div className="ios-cr">
            <span className="ios-ct">
              2:40pm
            </span>
            <span className="ios-cb" style={{background:"#25D366"}}>
              1
            </span>
          </div>
        </div>
        <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Kavitha R.','KR','+91 97654 32109','customer')
})}>
          <div className="ios-av ios-av-amber" style={{fontSize:"16px"}}>
            KR
          </div>
          <div className="ios-cm">
            <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
              Kavitha R.{" "}
              <span style={{fontSize:"12.5px",background:"#dcf8c6",color:"#075e54",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                WA
              </span>
            </div>
            <div className="ios-cp">
              When can I come see the hybrid mattress?
            </div>
          </div>
          <div className="ios-cr">
            <span className="ios-ct">
              11:15am
            </span>
            <span className="ios-cb" style={{background:"#25D366"}}>
              2
            </span>
          </div>
        </div>
        <div className="ios-chat-row" onClick={on(function(event){openPulseCustomerChat('Ali','AL','+91 90000 11122','missedcall')
})}>
          <div className="ios-av" style={{background:"#fdeaea",color:"#c0392b",fontSize:"16px"}}>
            AL
          </div>
          <div className="ios-cm">
            <div className="ios-cn" style={{display:"flex",alignItems:"center",gap:"5px"}}>
              Ali{" "}
              <span style={{fontSize:"12.5px",background:"#fdeaea",color:"#c0392b",padding:"1px 5px",borderRadius:"5px",fontWeight:"700"}}>
                <i className="ti ti-phone-x" style={{fontSize:"12.5px",verticalAlign:"-1px"}} />
                {" "}Missed
              </span>
            </div>
            <div className="ios-cp" style={{color:"#c0392b"}}>
              Called 9:40am · not returned yet
            </div>
          </div>
          <button onClick={on(function(event){event.stopPropagation();aSwitch('calls');setTimeout(function(){dialerStartCall('Ali')},80)
})} style={{display:"flex",alignItems:"center",gap:"4px",background:"#0f6e56",color:"#fff",border:"none",borderRadius:"8px",padding:"6px 9px",fontSize:"12.5px",fontWeight:"700",cursor:"pointer",flexShrink:"0"}}>
            <i className="ti ti-phone" style={{fontSize:"12.5px"}} />
            Call back
          </button>
        </div>
        <div style={{padding:"10px 14px",fontSize:"12.5px",color:"#8e8e93",textAlign:"center"}} id="custConvFooter">
          Customer threads managed via WhatsApp Business + On-ground Calling
        </div>
      </div>
    </div>
  );
}
