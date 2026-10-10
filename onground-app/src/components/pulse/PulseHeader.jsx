import { on } from '../../utils/on';

/**
 * PulseHeader
 * Header
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseHeader() {
  return (
    <div style={{background:"linear-gradient(135deg,#3b1a5a,#6b2fa0)",padding:"10px 14px 0",flexShrink:"0",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#E01E5A" />
            <rect x="10" y="1" width="5" height="5" rx="1.5" fill="#36C5F0" />
            <rect x="1" y="10" width="5" height="5" rx="1.5" fill="#2EB67D" />
            <rect x="10" y="10" width="5" height="5" rx="1.5" fill="#ECB22E" />
          </svg>
        </div>
        <div style={{flex:"1",minWidth:"0",display:"flex",alignItems:"baseline",gap:"6px"}}>
          <span style={{fontSize:"16px",fontWeight:"700",color:"#fff"}}>
            Pulse
          </span>
          {" "}
          <span style={{fontSize:"12.5px",color:"rgba(255,255,255,.6)"}} id="pulseBrandLine">
            The Sleep Company · Koramangala
          </span>
        </div>
        <button onClick={on(function(event){togglePulseNewMsgMenu(event)
})} id="pulseCreateBtn" title="New message" style={{width:"30px",height:"30px",borderRadius:"50%",background:"#fff",border:"none",boxShadow:"0 2px 8px rgba(0,0,0,.28)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
          <i className="ti ti-plus" style={{fontSize:"16px",color:"#3b1a5a",fontWeight:"700"}} />
        </button>
        <div id="pulseNewMsgMenu" style={{display:"none",position:"absolute",top:"44px",right:"14px",background:"#fff",borderRadius:"12px",boxShadow:"0 10px 28px rgba(0,0,0,.22)",minWidth:"190px",overflow:"hidden",zIndex:"400"}}>
          <div style={{padding:"9px 14px 5px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".4px"}}>
            New message
          </div>
          <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Sunita Rao','SR','DM','manager')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#FFD700",color:"#3a2a00",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
              SR
            </span>
            Sunita Rao
          </div>
          <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Priya Krishnan','PK','DM','peer')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#fdecec",color:"#c23331",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
              PK
            </span>
            Priya Krishnan
          </div>
          <div onClick={on(function(event){closePulseNewMsgMenu();openPulseChat('Raju Kumar','RK','DM','peer')
})} style={{padding:"10px 14px",fontSize:"14px",fontWeight:"600",color:"#1a1a1a",cursor:"pointer",display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{width:"22px",height:"22px",borderRadius:"50%",background:"#e1f5ee",color:"#0f6e56",fontSize:"12.5px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center"}}>
              RK
            </span>
            Raju Kumar
          </div>
        </div>
      </div>
    </div>
  );
}
