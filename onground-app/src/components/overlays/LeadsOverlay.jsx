import { on } from '../../utils/on';

/**
 * LeadsOverlay
 * Leads Overlay
 *
 * Static markup converted 1:1 from the original HTML (id: leadsOverlay, class: ios-overlay).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LeadsOverlay() {
  return (
    <div className="ios-overlay" id="leadsOverlay" style={{alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:"20px",width:"94%",maxWidth:"420px",maxHeight:"82vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,.35)"}}>
        <div style={{background:"linear-gradient(135deg,#3b1254,#6b2fa0)",padding:"14px 16px",display:"flex",alignItems:"center",gap:"10px",flexShrink:"0"}}>
          <i className="ti ti-users" style={{fontSize:"19px",color:"#c084fc"}} />
          <div style={{flex:"1"}}>
            <div style={{fontSize:"16.5px",fontWeight:"700",color:"#fff"}}>
              Leads
            </div>
            <div style={{fontSize:"13.5px",color:"rgba(255,255,255,.7)"}} id="leadsModalSub">
              Your allocated leads · SLA to close
            </div>
          </div>
          <button onClick={on(function(event){closeLeadsModal()
})} title="Close" style={{background:"rgba(255,255,255,.16)",border:"none",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",cursor:"pointer",flexShrink:"0"}}>
            ✕
          </button>
        </div>
        {/* Pagination bar: one lead per page, prev/next + dots */}
        <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:"1px solid #f0f0f0",flexShrink:"0",background:"#fafafc"}}>
          <button onClick={on(function(event){leadsModalNav(-1)
})} id="leadsPrevBtn" style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #e5e5ea",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#3b1254",flexShrink:"0"}}>
            ‹
          </button>
          <div style={{flex:"1",display:"flex",justifyContent:"center",gap:"5px"}} id="leadsPagerDots" />
          <button onClick={on(function(event){leadsModalNav(1)
})} id="leadsNextBtn" style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #e5e5ea",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16.5px",color:"#3b1254",flexShrink:"0"}}>
            ›
          </button>
        </div>
        <div style={{flex:"1",overflowY:"auto",padding:"14px"}} id="leadsModalPage" />
        {/* Persistent footer — always visible regardless of which lead page you're on */}
        <div style={{padding:"9px 14px",borderTop:"1px solid #f0f0f0",flexShrink:"0",background:"#fff9f9"}}>
          <div style={{fontSize:"12.5px",fontWeight:"700",color:"#e24b4a",textTransform:"uppercase",letterSpacing:".5px",display:"flex",alignItems:"center",gap:"5px"}}>
            <span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#e24b4a"}} />
            Cumulative Missed: 2{" "}
            <span style={{fontWeight:"500",color:"#a32d2d",textTransform:"none",letterSpacing:"0"}}>
              · expired without close, visible to manager
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
