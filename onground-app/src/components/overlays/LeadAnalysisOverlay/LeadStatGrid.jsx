/**
 * LeadStatGrid
 * 2×2 stat grid — spacious, readable
 *
 * Static markup converted 1:1 from the original HTML (id: -).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function LeadStatGrid() {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"0 14px 10px"}}>
      <div style={{background:"#e8f0fe",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#185fa5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
          <i className="ti ti-user-plus" style={{fontSize:"17px",color:"#fff"}} />
        </div>
        <div>
          <div style={{fontSize:"23px",fontWeight:"800",color:"#185fa5",lineHeight:"1"}}>
            6
          </div>
          <div style={{fontSize:"13.5px",color:"#185fa5",fontWeight:"600",marginTop:"3px"}}>
            Captured
          </div>
        </div>
      </div>
      <div style={{background:"#e1f5ee",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#1d9e75",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
          <i className="ti ti-chart-line" style={{fontSize:"17px",color:"#fff"}} />
        </div>
        <div>
          <div style={{fontSize:"23px",fontWeight:"800",color:"#1d9e75",lineHeight:"1"}}>
            17%
          </div>
          <div style={{fontSize:"13.5px",color:"#1d9e75",fontWeight:"600",marginTop:"3px"}}>
            Conversion
          </div>
        </div>
      </div>
      <div style={{background:"#fff8e1",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#c8860a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
          <i className="ti ti-clock-exclamation" style={{fontSize:"17px",color:"#fff"}} />
        </div>
        <div>
          <div style={{fontSize:"23px",fontWeight:"800",color:"#c8860a",lineHeight:"1"}}>
            1
          </div>
          <div style={{fontSize:"13.5px",color:"#c8860a",fontWeight:"600",marginTop:"3px"}}>
            Ageing
          </div>
        </div>
      </div>
      <div style={{background:"#fdecec",borderRadius:"14px",padding:"14px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"#e24b4a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:"0"}}>
          <i className="ti ti-x" style={{fontSize:"17px",color:"#fff"}} />
        </div>
        <div>
          <div style={{fontSize:"23px",fontWeight:"800",color:"#e24b4a",lineHeight:"1"}}>
            2
          </div>
          <div style={{fontSize:"13.5px",color:"#e24b4a",fontWeight:"600",marginTop:"3px"}}>
            Missed
          </div>
        </div>
      </div>
    </div>
  );
}
