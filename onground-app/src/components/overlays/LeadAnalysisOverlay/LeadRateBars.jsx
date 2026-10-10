/**
 * LeadRateBars
 * Rate bars — fatter, labelled inline
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LeadRateBars() {
  return (
    <div style={{padding:"0 14px 12px"}}>
      <div style={{background:"#f9f9f9",borderRadius:"14px",padding:"14px 14px 10px"}}>
        {/* Capture rate */}
        <div style={{marginBottom:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
              Capture rate
            </span>
            {" "}
            <span style={{fontSize:"16.5px",fontWeight:"800",color:"#185fa5"}}>
              67%
            </span>
          </div>
          <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
            <div style={{width:"67%",height:"100%",background:"linear-gradient(90deg,#185fa5,#60a5fa)",borderRadius:"4px"}} />
          </div>
        </div>
        {/* Closed won */}
        <div style={{marginBottom:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
              Closed won
            </span>
            {" "}
            <span style={{fontSize:"16.5px",fontWeight:"800",color:"#1d9e75"}}>
              17%
            </span>
          </div>
          <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
            <div style={{width:"17%",height:"100%",background:"linear-gradient(90deg,#1d9e75,#5dcaa5)",borderRadius:"4px"}} />
          </div>
        </div>
        {/* SLA on-time */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
            <span style={{fontSize:"14.5px",fontWeight:"700",color:"#1a1a1a"}}>
              SLA on-time
            </span>
            {" "}
            <span style={{fontSize:"16.5px",fontWeight:"800",color:"#c8860a"}}>
              50%
            </span>
          </div>
          <div style={{height:"8px",background:"#e5e5ea",borderRadius:"4px",overflow:"hidden"}}>
            <div style={{width:"50%",height:"100%",background:"linear-gradient(90deg,#c8860a,#fbbf24)",borderRadius:"4px"}} />
          </div>
        </div>
      </div>
    </div>
  );
}
