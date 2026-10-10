import { on } from '../../utils/on';

/**
 * PulseKudosListOverlay
 * KUDOS OVERLAY — opened from the "#kudos" channel row (GET only, not GIVE)
 *
 * Static markup converted 1:1 from the original HTML (id: pulseKudosListOverlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function PulseKudosListOverlay() {
  return (
    <div id="pulseKudosListOverlay" style={{position:"absolute",inset:"0",background:"#eceef4",zIndex:"326",display:"none",flexDirection:"column"}}>
      <div style={{background:"linear-gradient(135deg,#c8860a,#e0a52f)",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
        <button onClick={on(function(event){closePulseKudosList()
})} title="Back" style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
          ←
        </button>
        <div style={{flex:"1"}}>
          <div style={{fontSize:"15px",fontWeight:"700",color:"#fff",display:"flex",alignItems:"center",gap:"6px"}}>
            🏆 kudos
          </div>
          <div style={{fontSize:"12.5px",color:"#fdf0d5"}}>
            Team recognition, sent by your leaders
          </div>
        </div>
      </div>
      <div id="ppanel-kudos" style={{paddingBottom:"80px",flex:"1",overflowY:"auto"}}>
        <div style={{margin:"8px 12px 4px",padding:"7px 10px",background:"#fff3e0",borderRadius:"8px",display:"flex",alignItems:"center",gap:"7px"}}>
          <i className="ti ti-info-circle" style={{fontSize:"14.5px",color:"#c8860a"}} />
          {" "}
          <span style={{fontSize:"12.5px",color:"#854d0e",fontWeight:"500"}}>
            You receive kudos — leaders send them to celebrate your wins 🎉
          </span>
        </div>
        <div style={{padding:"8px 12px 4px",fontSize:"12.5px",fontWeight:"700",color:"#8e8e93",textTransform:"uppercase",letterSpacing:".5px"}}>
          📥 Incoming Kudos
        </div>
        <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#fff8e1,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #FFD700",boxShadow:"0 3px 10px rgba(255,215,0,.2)"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
              SR
            </div>
            <div style={{flex:"1"}}>
              <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                Sunita Rao (Manager)
              </div>
              <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                12:40pm · Today
              </div>
            </div>
            <div style={{fontSize:"22px"}}>
              🏆
            </div>
          </div>
          <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#fffbf0",borderRadius:"8px",padding:"8px 10px"}}>
            "Great work with Mukunda — closed that warranty objection beautifully. Keep it up!"
          </div>
        </div>
        <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#fef3f2,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #fca5a5",boxShadow:"0 2px 8px rgba(226,75,74,.1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#e1f5ee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#0f6e56",flexShrink:"0"}}>
              RK
            </div>
            <div style={{flex:"1"}}>
              <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                Raju Kumar
              </div>
              <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                Yesterday
              </div>
            </div>
            <div style={{fontSize:"22px"}}>
              🔥
            </div>
          </div>
          <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#fff9f9",borderRadius:"8px",padding:"8px 10px"}}>
            "Nice cross-sell on the Tranquo chair! Impressed by how you read the customer."
          </div>
        </div>
        <div style={{margin:"0 12px 8px",background:"linear-gradient(135deg,#f0fdf4,#fff)",borderRadius:"14px",padding:"12px 14px",border:"1.5px solid #86efac",boxShadow:"0 2px 8px rgba(29,158,117,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#faeeda",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14.5px",fontWeight:"700",color:"#854f0b",flexShrink:"0"}}>
              SR
            </div>
            <div style={{flex:"1"}}>
              <div style={{fontSize:"13.5px",fontWeight:"700",color:"#1a1a1a"}}>
                Sunita Rao (Manager)
              </div>
              <div style={{fontSize:"12.5px",color:"#8e8e93"}}>
                2 days ago
              </div>
            </div>
            <div style={{fontSize:"22px"}}>
              💪
            </div>
          </div>
          <div style={{fontSize:"13.5px",color:"#1a1a1a",lineHeight:"1.5",background:"#f7fffe",borderRadius:"8px",padding:"8px 10px"}}>
            "Top SOP score this week — 72/100 on Mukunda's conversation. Store leader!"
          </div>
        </div>
        <div style={{padding:"10px 12px",fontSize:"12.5px",color:"#8e8e93",textAlign:"center"}}>
          Your all-time kudos:{" "}
          <b style={{color:"#1d9e75"}}>
            12
          </b>
          {" "}🎉
        </div>
      </div>
    </div>
  );
}
